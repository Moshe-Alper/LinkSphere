import { useEffect, useState } from "react"
import HomeComponent from "../cmps/HomeComponent"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebaseConfig"
import { useNavigate } from "react-router-dom"
import { Loader } from "../cmps/common/Loader/Loader"

export default function Home({ currentUser }) {
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

    return isLoading ? <Loader /> : <HomeComponent currentUser={currentUser} />
}