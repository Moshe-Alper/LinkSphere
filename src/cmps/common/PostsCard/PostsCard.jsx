import { LikeButton } from '../LinkButton/LikeButton'
import './PostsCard.scss'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, getAllUsers, deletePost } from '../../../api/FirestoreAPI'
import { useMemo, useState } from 'react'
import { BsPencil, BsTrash } from "react-icons/bs"

export function PostsCard({ posts, getEditData  }) {
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
        <header className="post-header">
            <div className="user-info">
                {userImageLink && (
                    <img src={userImageLink} alt="profile-image" className="profile-image" />
                )}
                <div className="user-details">
                    <p 
                        className="name"
                        onClick={() => navigate("/profile",
                        { state: { id: posts?.userID, email: posts.userEmail } })}>
                        {posts.userName}
                    </p>
                    <p className="headline">
                        {allUsers.filter((user) => user.id === posts.userID)[0]?.headline}
                    </p>
                    <p className="timestamp">{posts.timestamp}</p>
                </div>
            </div>
            {currentUser?.userID === posts.userID && (
                <div className="action-container">
                    <BsPencil size={30} className="action-icon" onClick={() => getEditData(posts)} />
                    <BsTrash size={30} className="action-icon" onClick={() => deletePost(posts.id)} />
                </div>
            )}
        </header>
        <p className="status">{posts.status}</p>
        <LikeButton 
            userId={currentUser?.userID}
            postId={posts.id}
            currentUser={currentUser}
        />
    </section>
)
}