'use client'
import { useState } from "react"
import { useFormStatus } from "react-dom";
import Select from 'react-select'

export default function SignupForm() {
    const [userType, setUserType] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        school: '',
        field: [] as string[],
        graduation_year: '',
        company: '',
        job_title: '',
        linkedin_url: '',
        subscribed: true,
    })

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        console.log(formData)
    }

    return (
        <div>
            <h1>Register With All-ASA!</h1>
            <p>Creating an All-ASA account allows you to register your ASA, apply for and post exclusive internship opportunities,
                and apply to be a mentor or mentee in our signature Mentorship Program!
            </p>
            <form onSubmit={handleSubmit}>
                <div>
                    {/* userType selection -- seems to correctly work for now */}
                    <div>
                        <p>I am a...</p>
                        <select defaultValue="" onChange={(e) => setUserType(e.target.value)}>
                            <option value="" disabled>Select your account type</option>
                            <option value="student">Student</option>
                            <option value="alumni">Professional</option>
                        </select>
                    </div>
                    <div>
                        <p>Basic Information</p>
                        {/* TODO - need to wrap these up in divs of their own */}
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Create a password:</label>
                            <input
                                id="password"
                                type="password"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="field">Field of Interest:</label>
                            <Select
                                isMulti
                                name="colors"
                                options={fieldOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                id="field"
                                onChange={(selected) => setFormData({ ...formData, field: selected.map(option => option.value) })}
                            />
                        </div>
                        <div>
                            <label htmlFor="linkedin_url">LinkedIn URL (if applicable)</label>
                            <input
                                id="linkedin_url"
                                type="url"
                                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                            />
                        </div>
                    </div>
                    {userType === 'student' && (
                        <div>
                            <p>Student Information</p>
                            <div>
                                <label htmlFor="school">College or University</label>
                                <input
                                    id="school"
                                    type="text"
                                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="graduation_year">Expected Graduation Year</label>
                                <input
                                    id="graduation_year"
                                    type="number"
                                    onChange={(e) => setFormData({ ...formData, graduation_year: e.target.value })}
                                />
                            </div>
                        </div>

                    )}
                    {userType === 'alumni' && (
                        <div>
                            <p>Professional Information</p>
                            <div>
                                <label htmlFor="company">Current Company (can include past)</label>
                                <input
                                    id="company"
                                    type="text"
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="job_title">Job Title</label>
                                <input
                                    id="job_title"
                                    type="text"
                                    onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                                />
                            </div>
                        </div>
                    )}
                    {/* Subscription button */}
                    <label htmlFor="subscribed">I agree to subscribe to the All-ASA newsletter to be the first to hear about
                        new internship and mentorship opportunities, as well as All-ASA programming such as retreats, career panels,
                        and cultural showcases!
                    </label>
                    <input
                        type="checkbox"
                        defaultChecked={true}
                        onChange={(e) => setFormData({ ...formData, subscribed: e.target.checked })}
                    />
                </div>
                <SubmitButton />
            </form >

        </div >
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button type="submit" disabled={pending}>
            {pending ? "Submitting ..." : "Submit"}
        </button>
    )
}

interface FieldOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    // TODO - can I remove these
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
}

const fieldOptions: readonly FieldOption[] = [
    { value: 'entrepreneurship', label: 'Entrepreneurship', color: '#FCE581' },
    { value: 'finance_accounting', label: 'Finance & Accounting', color: '#282DB0' },
    { value: 'tech_engineering', label: 'Technology & Engineering', color: '#73DECA' },
    { value: 'medical_healthcare', label: 'Medicine & Healthcare', color: '#52B54A' },
    { value: 'law', label: 'Law & Government', color: '#C9A4DB' },
    { value: 'media_art', label: 'Media, Entertainment, & Art', color: '#B83027' },
    { value: 'real_estate', label: 'Real Estate & Construction', color: '#999590' },
    { value: 'sports', label: 'Sports', color: '#EB8F28' },
]