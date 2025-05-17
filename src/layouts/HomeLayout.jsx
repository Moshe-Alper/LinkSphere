import { Topbar } from "../cmps/common/Topbar/Topbar";
import { getCurrentUser } from "../api/FirestoreAPI";
import Home from "../pages/Home";
import { useMemo, useState } from "react";


export function HomeLayout() {
    const [currentUser, setCurrentUser] = useState({})
    useMemo(() => {
        getCurrentUser(setCurrentUser)
    }, [])

    return (
        <div>
            <Topbar />
            <Home currentUser={currentUser} />
        </div>
    )
}