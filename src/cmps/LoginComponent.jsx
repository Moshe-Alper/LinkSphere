import React from 'react';
import '../Sass/LoginComponent.scss'
import { LoginApi } from '../api/AuthApi';

export default function LoginComponent() {

    const login = () => {
        let res = LoginApi()
        console.log(res)
    }
    return (
        <div className="login-wrapper">
            <h1>LoginComponent</h1>
            <div className="auth-inputs">
                <input
                    onChange={(e) =>
                        setCredentials((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="common-input"
                    placeholder="Enter your Email"
                />
                <input
                    onChange={(e) =>
                        setCredentials((prev) => ({ ...prev, password: e.target.value }))
                    }
                    className="common-input"
                    placeholder="Enter your Password"
                />
            </div>
            <button onClick={login} className="login-btn">Log in to LinkSphere</button>
        </div>
    )
}

