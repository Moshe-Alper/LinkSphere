import './LikeButton.scss'
import { AiFillHeart, AiOutlineHeart, AiOutlineComment} from 'react-icons/ai'
import { likePost, getLikesByUser, postComment, getComments } from '../../../api/FirestoreAPI'
import { useMemo, useState } from 'react'
import { getCurrentTimestamp } from "../../../helpers/useMoment"

export function LikeButton({ userId, postId, currentUser }) {
    const [likesCount, setLikesCount] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const [isShowCommentBox, setIsShowCommentBox] = useState(false)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])

    const handleLike = () => {
        likePost(userId, postId, isLiked)
    }

    const getComment = (ev) => {
        setComment(ev.target.value)
    }

    const addComment = async () => {
        await postComment(postId, comment, getCurrentTimestamp('LLL'), currentUser?.name)
        setComment('')
    }
    useMemo(() => {
        getLikesByUser(userId, postId, setIsLiked, setLikesCount)
        getComments(postId, setComments)
    }, [userId, postId])

    return (
      <div className="like-container">
        <p>{likesCount} People like this post</p>
        <div>
          <hr className="hr-line" />
        </div>
        <div className="like-comment-container">
          <div className="likes-comment-inner">
            <span onClick={handleLike}>
              {isLiked ? (
                <AiFillHeart size={24} color=" #0a66c2" />
              ) : (
                <AiOutlineHeart size={24} color=" #000" />
              )}
              <p
                className={isLiked ? "blue" : "black"}
                style={{ marginLeft: 4, marginBottom: 0 }}
              >
                Like
              </p>
            </span>
          </div>
          <div
            className="likes-comment-inner"
            onClick={() => setIsShowCommentBox(!isShowCommentBox)}
          >
            <AiOutlineComment
              size={24}
              color={isShowCommentBox ? "#0a66c2" : "#000"}
            />
            <p className={isShowCommentBox ? "blue" : "black"}>Comment</p>
          </div>
        </div>
        {isShowCommentBox ? (
          <>
            <input
              type="text"
              onChange={getComment} 
              placeholder="Add a Comment"
              className="comment-input"
              name="comment"
              value={comment}
            />
            <button className="add-comment-btn" onClick={addComment}>
              Add Comment
            </button>
            {comments.length > 0
              ? comments.map((comment, idx) => {
                  return (
                    <div className="comment-item" key={idx}>
                        <p className="comment-name">{comment.name}</p>
                      <p className="comment-text">{comment.comment}</p>
                      <p className="comment-timestamp">{comment.timeStamp}</p>
                    </div>
                  )
                })
              : null}
          </>
        ) : null}
      </div>
    );
}
