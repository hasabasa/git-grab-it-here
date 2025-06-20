
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('track-referral function called with method:', req.method)
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    const url = new URL(req.url)
    const partnerCode = url.searchParams.get('ref') || url.searchParams.get('partner')
    const utmSource = url.searchParams.get('utm_source')
    const utmMedium = url.searchParams.get('utm_medium')
    const utmCampaign = url.searchParams.get('utm_campaign')
    const utmContent = url.searchParams.get('utm_content')
    const utmTerm = url.searchParams.get('utm_term')
    
    console.log('Tracking referral click:', { partnerCode, utmSource, utmMedium, utmCampaign })

    if (!partnerCode) {
      console.log('No partner code provided')
      return new Response(
        JSON.stringify({ success: false, error: 'No partner code provided' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Найти партнера по коду
    const { data: partner, error: partnerError } = await supabaseClient
      .from('partners')
      .select('id, partner_code, is_active')
      .eq('partner_code', partnerCode)
      .eq('is_active', true)
      .single()

    if (partnerError || !partner) {
      console.error('Partner not found:', partnerError)
      return new Response(
        JSON.stringify({ success: false, error: 'Partner not found or inactive' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      )
    }

    // Получить информацию о посетителе
    const userAgent = req.headers.get('user-agent')
    const referrer = req.headers.get('referer')
    const forwardedFor = req.headers.get('x-forwarded-for')
    const realIp = req.headers.get('x-real-ip')
    const visitorIp = forwardedFor?.split(',')[0] || realIp || 'unknown'

    // Записать клик
    const { data: clickData, error: clickError } = await supabaseClient
      .from('referral_clicks')
      .insert({
        partner_id: partner.id,
        visitor_ip: visitorIp,
        user_agent: userAgent,
        referrer: referrer,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_content: utmContent,
        utm_term: utmTerm,
        page_url: req.url
      })
      .select()
      .single()

    if (clickError) {
      console.error('Error recording click:', clickError)
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to record click' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    console.log('Click recorded successfully:', clickData.id)

    // Возвращаем success для дальнейшего использования
    return new Response(
      JSON.stringify({ 
        success: true, 
        clickId: clickData.id,
        partnerId: partner.id,
        message: 'Click tracked successfully' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
