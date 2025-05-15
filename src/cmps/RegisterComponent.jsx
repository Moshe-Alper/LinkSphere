
import React, { useState } from "react"
import { RegisterApi, GoogleSignInApi } from "../api/AuthAPI"
import LinkSphereLogo from "../assets/logo.png"
import GoogleButton from 'react-google-button'
import { toast } from 'react-toastify'
import "../Sass/RegisterComponent.scss"
import { useNavigate } from "react-router-dom"

export default function RegisterComponent() {
    let navigate = useNavigate()
    const [credentials, setCredentials] = useState({})

    const handleChange = (ev) => {
        const { name, value } = ev.target
        setCredentials((prev) => ({ ...prev, [name]: value }))
    }

    const register = async () => {
        try {
            let res = await RegisterApi(credentials.email, credentials.password)
            toast.success("Account Created")
            navigate('/home')
        } catch (err) {
            toast.error("Cannot Create you Account")
        }
    }

    const googleSignIn = () => {
        let response = GoogleSignInApi()
    }

    return (
        <div className="register-wrapper">
            <img src={LinkSphereLogo} className="logo" alt="LinkSphere logo" />
            <h1>Make the most of your professional life</h1>
            <div className="auth-inputs">
                <input
                    name="email"
                    onChange={handleChange}
                    className="common-input"
                    placeholder="Email or phone number"
                    type="email"
                />
                <input
                    name="password"
                    onChange={handleChange}
                    className="common-input"
                    placeholder="Password (6 or more characters)"
                    type="password"
                />
            </div>
            <div className="actions">
                <button onClick={register} className="signin-btn">Agree & Join</button>
                <hr className="hr-text" data-content="or"></hr>
                <div className="google-btn" style={{ width: '300px' }}>
                    <GoogleButton
                        onClick={googleSignIn}
                        style={{ width: '100%' }}
                    />
                </div>
                <p className="go-to-signup">Already on LinkSphere?
                    <span className="join-now"
                        onClick={() => navigate('/')
                        }> Sign in</span></p>
            </div>
        </div>
    )
}
