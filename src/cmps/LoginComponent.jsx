
import React, { useState } from "react"
import { LoginApi } from "../api/AuthApi"
import LinkSphereLogo from "../assets/logo.png"
import GoogleButton from 'react-google-button'
import { toast } from 'react-toastify'


import "../Sass/LoginComponent.scss"

export default function LoginComponent() {
    const [credentials, setCredentials] = useState({})

    const handleChange = (ev) => {
        const { name, value } = ev.target
        setCredentials((prev) => ({ ...prev, [name]: value }))
    }

    const login = async () => {
        try {
            let res = await LoginApi(credentials.email, credentials.password)
            toast.success("Signed in to LinkSphere")
        } catch (err) {
            toast.error("Please Check you Credentials")
        }
    }

    return (
        <div className="login-wrapper">
            <img src={LinkSphereLogo} className="logo" alt="LinkSphere logo" />
            <h1>Sign in</h1>
            <p>Stay updated on your professional world</p>
            <div className="auth-inputs">
                <input
                    name="email"
                    onChange={handleChange}
                    className="common-input"
                    placeholder="Email or Phone"
                    type="email"
                />
                <input
                    name="password"
                    onChange={handleChange}
                    className="common-input"
                    placeholder="Password"
                    type="password"
                />
            </div>
            <div className="actions">
                <button onClick={login} className="signin-btn">Sign in</button>
                <hr className="hr-text" data-content="or"></hr>
                <div className="google-btn" style={{ width: '300px' }}>
                    <GoogleButton
                        onClick={() => { console.log('Google button clicked') }}
                        style={{ width: '100%' }}
                    />
                </div>
                <p className="go-to-signup">New to LoginSphere? <span className="join-now">Join now</span></p>
            </div>
        </div>
    )
}
