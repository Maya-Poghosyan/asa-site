'use client'
import { login } from "../actions"
import { useState } from "react"
import SubmitButton from "../components/SubmitButton"

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [isPending, setIsPending] = useState(false);
    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setIsPending(true)
        await login(formData)
        setIsPending(false)
    }
    return (
        <div>
            <h1>Log into your All-ASA account!</h1>
            <p>Don't have an account? <a href="/signup">Sign Up!</a></p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password"
                        type="password"
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    />
                </div>
                <SubmitButton isPending={isPending} />
            </form>
        </div>
    )
}