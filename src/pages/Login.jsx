import React, { useEffect, useState } from "react"
import LoginComponent from "../cmps/LoginComponent"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebaseConfig"
import { useNavigate } from "react-router-dom"
import { Loader } from "../cmps/common/Loader"

export default function Login() {
    const [isLoading, setIsLoading] = useState(true)
    let navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (res) => {
            if (res?.accessToken) {
                navigate('/home')
            } else {
                setIsLoading(false)
            }
        })
    }, [])

    
    return isLoading ? <Loader /> : <LoginComponent />
}

