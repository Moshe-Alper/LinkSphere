import './LikeButton.scss'
import { AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import { likePost, getLikesByUser } from '../../../api/FirestoreAPI'
import { useMemo, useState } from 'react'

export function LikeButton({ userId, postId }) {
    const [likesCount, setLikesCount] = useState(0)
    const [isLiked, setIsLiked] = useState(false)

    const handleLike = () => {
        likePost(userId, postId, isLiked)
    }

    useMemo(() => {
        getLikesByUser(userId, postId, setIsLiked, setLikesCount)
    }, [userId, postId])

    return (
        <div className="like-container" onClick={handleLike}>
                <p>{likesCount} People like this post</p>
                <div>
                    <hr className="hr-line" />
                </div>
                <div className="likes-inner">
                {isLiked ?  
                <AiFillHeart size={24} color=" #0a66c2" /> 
                : <AiOutlineHeart size={24} /> 
                }
                <p className={isLiked ? 'blue' : 'black'}>Like</p>
                </div>
        </div>
    )
}