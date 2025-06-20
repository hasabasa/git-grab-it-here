
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    const { email, password, fullName, companyName, partnerCode } = await req.json()

    // Создаем пользователя
    const { data: user, error: userError } = await supabaseClient.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        full_name: fullName,
        company_name: companyName
      }
    })

    if (userError) {
      throw userError
    }

    // Назначаем роль партнера
    const { error: roleError } = await supabaseClient
      .from('user_roles')
      .insert({
        user_id: user.user.id,
        role: 'partner'
      })

    if (roleError) {
      throw roleError
    }

    // Создаем запись партнера
    const { error: partnerError } = await supabaseClient
      .from('partners')
      .insert({
        user_id: user.user.id,
        partner_code: partnerCode,
        company_name: companyName,
        contact_email: email
      })

    if (partnerError) {
      throw partnerError
    }

    // Создаем промокод
    const { error: promoError } = await supabaseClient
      .from('promo_codes')
      .insert({
        code: partnerCode,
        partner_id: (await supabaseClient
          .from('partners')
          .select('id')
          .eq('user_id', user.user.id)
          .single()).data?.id
      })

    if (promoError) {
      throw promoError
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Партнер создан успешно',
        user: user.user 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
