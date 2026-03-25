'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function login(data: {
    email: string
    password: string
}) {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/account')
}

export async function signup(data: {
    name: string,
    email: string,
    password: string,
    school?: string,
    field: string[],
    graduation_year?: number,
    company?: string,
    job_title?: string,
    linkedin_url?: string,
    subscribed: boolean,
}) {
    const supabase = await createClient()
    const { error: authError } = await supabase.auth.signUp({ email: data.email, password: data.password })
    if (authError) {
        redirect('/error')
    }
    const { error } = await supabase.from('site_member_data').insert({
        email: data.email,
        name: data.name,
        school: data.school,
        field: data.field,
        graduation_year: data.graduation_year,
        company: data.company,
        job_title: data.job_title,
        linkedin_url: data.linkedin_url,
        subscribed: data.subscribed,
    })
    if (error) {
        redirect('/error')
    }
    revalidatePath('/', 'layout')
    redirect('/account')
}