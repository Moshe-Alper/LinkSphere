import { useMemo, useState } from "react"
import { getCurrentUser } from "../api/FirestoreAPI"
import { Topbar } from "../cmps/common/Topbar/Topbar"
import { Profile } from "../pages/Profile"

export function ProfileLayout() {
    const [currentUser, setCurrentUser] = useState({})
    useMemo(() => {
        getCurrentUser(setCurrentUser)
    }, [])
    
    return (
        <div>
            <Topbar />
            <Profile currentUser={currentUser} />
        </div>
    )
}