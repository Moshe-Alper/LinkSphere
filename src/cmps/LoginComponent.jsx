import React, { useState } from "react"
import { LoginApi } from "../api/AuthApi"
import LinkSphereLogo from "../assets/logo.png"
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
            console.log(res.user)
        } catch (err) {
            console.log("err:", err)
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
            <button onClick={login} className="signin-btn">Sign in</button>
        </div>
    )
}
