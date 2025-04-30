import React, { useState } from 'react'
import { LoginApi } from '../api/AuthApi'
import LinkSphereLogo from '../assets/linksphereLogo.png'
import '../Sass/LoginComponent.scss'

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
            console.log('err:', err)
        }
    }

    return (
        <div className="login-wrapper">
            <img src={LinkSphereLogo} className='linkspherelogo' alt="LinkSphere logo" />
            <h1>LoginComponent</h1>
            <div className="auth-inputs">
                <input
                    name="email"
                    onChange={handleChange}
                    className="common-input"
                    placeholder="Enter your Email"
                />
                <input
                    name="password"
                    onChange={handleChange}
                    className="common-input"
                    placeholder="Enter your Password"
                />
            </div>
            <button onClick={login} className="login-btn">Log in to LinkSphere</button>
        </div>
    )
}
