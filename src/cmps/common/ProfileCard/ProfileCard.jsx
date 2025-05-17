import './ProfileCard.css'
import { ProfileEdit } from '../ProfileEdit/ProfileEdit'

export function ProfileCard({ currentUser, onEdit }) {

    const { name, email } = currentUser

    return (
        <>
            <div className="profile-card">
                <div className="actions">
                    <button onClick={onEdit} className="edit-btn">Edit</button>
                </div>
                <h3 className="user-name">{name}</h3>
                <p className="user-email">{email}</p>
            </div>
        </>
    )
}