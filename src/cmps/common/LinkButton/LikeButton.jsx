import './LikeButton.scss'
import { AiOutlineLike } from 'react-icons/ai'
import { likePost } from '../../../api/FirestoreAPI'

export function LikeButton({ userId, postId }) {
    const handleLike = () => {
        likePost(userId, postId)
    }
    return (
        <div className="like-container" onClick={handleLike}>
         <AiOutlineLike size={30} />
         <p>Like</p>
        </div>
    )
}