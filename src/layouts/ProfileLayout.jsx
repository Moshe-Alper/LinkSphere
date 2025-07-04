import { useEffect, useState } from "react"
import { getCurrentUser } from "../api/FirestoreAPI.jsx"
import { Topbar } from "../cmps/common/Topbar/Topbar"
import { Profile } from "../pages/Profile"

export function ProfileLayout() {
    const [currentUser, setCurrentUser] = useState({})
    useEffect(() => {
        getCurrentUser(setCurrentUser)
    }, [])
    
    return (
        <div>
            <Topbar currentUser={currentUser} />
            <Profile currentUser={currentUser} />
        </div>
    )
}