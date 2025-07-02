import { Topbar } from "../cmps/common/Topbar/Topbar";
import Connections from "../pages/Connections";
import { getCurrentUser } from "../api/FirestoreAPI";
import { useMemo, useState } from "react";


export function ConnectionsLayout() {
    const [currentUser, setCurrentUser] = useState({})
    
    useMemo(() => {
        getCurrentUser(setCurrentUser)
    }, [])
    
    return (
        <div>
            <Topbar currentUser={currentUser} />
            <Connections currentUser={currentUser} />
        </div>
    )
}