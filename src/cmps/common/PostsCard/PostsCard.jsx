import './PostsCard.css'
import { useNavigate } from 'react-router-dom'

export function PostsCard({ posts}) {
    let navigate = useNavigate()
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
        </section>
    )
}