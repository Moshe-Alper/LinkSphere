import { ProfileComponent } from "../cmps/ProfileComponent"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebaseConfig"
import { useNavigate } from "react-router-dom"
import { Loader } from "../cmps/common/Loader/Loader"
import { useEffect, useState } from "react"

export function Profile({ currentUser }) {
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

    return isLoading ? <Loader /> : <ProfileComponent currentUser={currentUser} />
}