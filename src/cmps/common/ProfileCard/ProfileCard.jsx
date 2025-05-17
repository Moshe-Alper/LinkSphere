import './ProfileCard.css'

export function ProfileCard({ currentUser }) {
    return (
        <div className="profile-card">
            {currentUser.name}
        </div>
    )
}