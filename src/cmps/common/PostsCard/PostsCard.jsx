import { LikeButton } from '../LinkButton/LikeButton'
import './PostsCard.scss'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, getAllUsers } from '../../../api/FirestoreAPI'
import { useMemo, useState } from 'react'

export function PostsCard({ posts }) {
    let navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const [allUsers, setAllUsers] = useState([])

    useMemo(() => {
        getCurrentUser(setCurrentUser)
        getAllUsers(setAllUsers)
    }, [])

    const userImageLink = allUsers
        .filter((item) => item.id === posts.userID)
        .map((item) => item.imageLink)[0];

return (
    <section className="posts-card">
        <div className="post-header">
            {userImageLink && (
                <img src={userImageLink} alt="profile-image" className="profile-image" />
            )}
            <div className="user-info">
                <p 
                    className="name"
                    onClick={() => navigate("/profile",
                    { state: { id: posts?.userID, email: posts.userEmail } })}>
                    {posts.userName}
                </p>
                <p className="timestamp">{posts.timestamp}</p>
            </div>
        </div>
        <p className="status">{posts.status}</p>
        <LikeButton 
            userId={currentUser?.userID}
            postId={posts.id}
            currentUser={currentUser}
        />
    </section>
)
}