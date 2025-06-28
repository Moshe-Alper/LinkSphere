import { useEffect } from "react";
import "./ConnectedUsers.scss";
import { getConnections } from "../../../api/FirestoreAPI";
import { useState } from "react"
import { AiOutlineUsergroupAdd } from 'react-icons/ai'

export function ConnectedUsers({ user, getCurrentUser, currentUser }) {
    const [isConnected, setIsConnected] = useState(false)

      useEffect(() => {
        getConnections(currentUser.userID, user.id, setIsConnected)
    }, [currentUser.userID, user.id])

    if (isConnected) return null

    return (
        <div className="connection-item">
            <img 
                src={user.imageLink} 
                alt={user.name} 
                className="avatar"
            />
            <div className="info">
                <div className="name">{user.name}</div>
                <div className="headline">{user.headline}</div>
            </div>
            <div className="actions">
                <button onClick={ev => { ev.stopPropagation(); getCurrentUser(user.id) }}>
                    <AiOutlineUsergroupAdd size={20}/>
                    Connect
                </button>
            </div>
        </div>
    )
}