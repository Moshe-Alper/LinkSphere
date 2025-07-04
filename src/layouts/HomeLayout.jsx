import { Topbar } from "../cmps/common/Topbar/Topbar";
import { getCurrentUser } from "../api/FirestoreAPI.js";
import Home from "../pages/Home";
import { useEffect, useState } from "react";


export function HomeLayout() {
    const [currentUser, setCurrentUser] = useState({})
    useEffect(() => {
        getCurrentUser(setCurrentUser)
    }, [])

    return (
        <div>
            <Topbar currentUser={currentUser} />
            <Home currentUser={currentUser} />
        </div>
    )
}