import './../Sass/ConnectionsComponent.scss'
import { getAllUsers, addConnection } from '../api/FirestoreAPI.jsx'
import { useEffect, useState } from 'react'
import { ConnectedUsers } from './common/ConnectedUsers/ConnectedUsers'

export function ConnectionsComponent({ currentUser }) {
    const [users, setUsers] = useState([])
    

    const getCurrentUser = (id) => {
    console.log(id)
    addConnection(currentUser.userID, id)
    }

    useEffect(() => {
    getAllUsers(setUsers)
    }, [])


    return (
        <section className="connections-section">
            <ul className="users">
                {users
                    .filter(user => user.id !== currentUser.userID)
                    .map(user => (
                        <ConnectedUsers 
                            key={user.id} 
                            user={user} 
                            getCurrentUser={getCurrentUser}
                            currentUser={currentUser}
                        />
                    ))}
            </ul>
        </section>
    )
}