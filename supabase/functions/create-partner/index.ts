
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('create-partner function called with method:', req.method)
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Starting partner creation process...')
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    console.log('Supabase client created successfully')

    const requestBody = await req.json()
    console.log('Request body received:', { ...requestBody, password: '[HIDDEN]' })
    
    const { login, password, fullName, instagramUsername, partnerCode } = requestBody

    if (!login || !password || !fullName || !instagramUsername || !partnerCode) {
      console.error('Missing required fields')
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Все поля обязательны для заполнения' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    // Генерируем email из логина
    const generatedEmail = `${login}@partners.internal`
    console.log('Generated email:', generatedEmail)

    // Проверяем уникальность email
    const { data: existingUser } = await supabaseClient.auth.admin.listUsers()
    const emailExists = existingUser.users.some(user => user.email === generatedEmail)
    
    if (emailExists) {
      console.error('Email already exists:', generatedEmail)
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Логин "${login}" уже занят. Выберите другой логин.` 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    // Проверяем уникальность партнерского кода
    const { data: existingPartner } = await supabaseClient
      .from('partners')
      .select('partner_code')
      .eq('partner_code', partnerCode)
      .single()

    if (existingPartner) {
      console.error('Partner code already exists:', partnerCode)
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Партнерский код "${partnerCode}" уже используется. Выберите другой код.` 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    console.log('Creating user with email:', generatedEmail)
    
    // Создаем пользователя
    const { data: user, error: userError } = await supabaseClient.auth.admin.createUser({
      email: generatedEmail,
      password,
      user_metadata: {
        full_name: fullName,
        instagram_username: instagramUsername
      }
    })

    if (userError) {
      console.error('User creation error:', userError)
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Ошибка создания пользователя: ${userError.message}` 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    console.log('User created successfully:', user.user.id)

    // Назначаем роль партнера
    console.log('Assigning partner role...')
    const { error: roleError } = await supabaseClient
      .from('user_roles')
      .insert({
        user_id: user.user.id,
        role: 'partner'
      })

    if (roleError) {
      console.error('Role assignment error:', roleError)
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Ошибка назначения роли: ${roleError.message}` 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    console.log('Role assigned successfully')

    // Создаем запись партнера
    console.log('Creating partner record...')
    const { error: partnerError } = await supabaseClient
      .from('partners')
      .insert({
        user_id: user.user.id,
        partner_code: partnerCode,
        instagram_username: instagramUsername,
        contact_email: generatedEmail
      })

    if (partnerError) {
      console.error('Partner record creation error:', partnerError)
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Ошибка создания записи партнера: ${partnerError.message}` 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    console.log('Partner record created successfully')

    // Получаем ID партнера для создания промокода
    const { data: partnerData, error: partnerSelectError } = await supabaseClient
      .from('partners')
      .select('id')
      .eq('user_id', user.user.id)
      .single()

    if (partnerSelectError) {
      console.error('Partner select error:', partnerSelectError)
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Ошибка получения данных партнера: ${partnerSelectError.message}` 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    console.log('Partner data retrieved:', partnerData.id)

    // Создаем промокод
    console.log('Creating promo code...')
    const { error: promoError } = await supabaseClient
      .from('promo_codes')
      .insert({
        code: partnerCode,
        partner_id: partnerData.id
      })

    if (promoError) {
      console.error('Promo code creation error:', promoError)
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Ошибка создания промокода: ${promoError.message}` 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    console.log('Promo code created successfully')
    console.log('Partner creation completed successfully')

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Партнер создан успешно',
        generatedEmail: generatedEmail,
        user: user.user 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Произошла неизвестная ошибка' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
