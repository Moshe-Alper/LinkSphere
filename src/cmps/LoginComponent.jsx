
import React, { useState } from "react"
import { LoginApi, GoogleSignInApi } from "../api/AuthAPI.jsx"
import LinkSphereLogo from "../assets/logo.png"
import GoogleButton from 'react-google-button'
import { toast } from 'react-toastify'
import "../Sass/LoginComponent.scss"
import { useNavigate } from "react-router-dom"

export default function LoginComponent() {
    let navigate = useNavigate()
    const [credentials, setCredentials] = useState({})

    const handleChange = (ev) => {
        const { name, value } = ev.target
        setCredentials((prev) => ({ ...prev, [name]: value }))
    }
    const login = async () => {
        try {
            let res = await LoginApi(credentials.email, credentials.password)
            toast.success("Signed in to LinkSphere")
            localStorage.setItem('userEmail', res.user.email)
            navigate("/home") 
        } catch (err) {
            console.log('Error:',err)
            toast.error("Please Check your Credentials")
        }
    }

    const googleSignIn = async () => {
    try {
        let response = await GoogleSignInApi()
        navigate("/home")
    } catch (err) {
        console.log('Error:',err)
        toast.error("Google sign-in failed")
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
                        onClick={googleSignIn}
                        style={{ width: '100%' }}
                    />
                </div>
                <p className="go-to-signup">New to LinkSphere?
                    <span className="join-now"
                        onClick={() => navigate('/register')
                        }> Join now</span></p>
            </div>
        </div>
    )
}
