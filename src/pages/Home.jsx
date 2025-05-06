import React, { useEffect, useState } from "react"
import HomeComponent from "../cmps/HomeComponent"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebaseConfig"
import { useNavigate } from "react-router-dom"
import { Loader } from "../cmps/common/Loader"

export default function Home() {
    const [isLoading, setIsLoading] = useState(true)
    let navigate = useNavigate()


    useEffect(() => {
        onAuthStateChanged(auth, (res) => {
            if (!res?.accessToken) {
                navigate('/')
            } else {
                setIsLoading(false)
            }
        })
    }, [])

    return isLoading ? <Loader /> : <HomeComponent />
}