import { LikeButton } from '../LinkButton/LikeButton'
import './PostsCard.css'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../../api/FirestoreAPI'
import { useMemo, useState } from 'react'

export function PostsCard({ posts}) {
    let navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({})

    useMemo(() => {
        getCurrentUser(setCurrentUser)
    }, [])

    return (
        <section className="posts-card">
            <p 
            className="name" 
            onClick={() => navigate("/profile", 
            { state: { id: posts?.userID, email: posts.userEmail } })}>
                {posts.userName}
            </p>
            <p className="timestamp ">{posts.timestamp}</p>
            <p className="status">{posts.status}</p>
            <LikeButton 
                userId={currentUser?.userID}
                postId={posts.id}
              />
        </section>
    )
}