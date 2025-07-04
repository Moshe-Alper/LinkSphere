import { useState, useMemo } from "react"
import { postStatus, getStatus, updatePost } from "../../../api/FirestoreAPI.js"
import ModalComponent from "../Modal/ModalComponent"
import { PostsCard } from "../PostsCard/PostsCard"
import { uploadPostImage } from "../../../api/ImageUpload.js"
import { getCurrentTimestamp } from "../../../helpers/useMoment"
import { getUniqueID } from "../../../helpers/getUniqueId"
import "./PostUpdate.scss"

export function PostStatus({ currentUser }) {
    const [modalOpen, setModalOpen] = useState(false)
    const [status, setStatus] = useState('')
    const [allStatuses, setAllStatuses] = useState([])
    const [currentPost, setCurrentPost] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [postImage, setPostImage] = useState('')

    const sendStatus = async () => {
        if (!currentUser) {
            console.error('Current user is not available')
            return
        }
        let object = {
            status: status,
            timestamp: getCurrentTimestamp("LLL"),
            userEmail: currentUser?.email,
            userName: currentUser?.name,
            postID: getUniqueID(), 
            userID: currentUser?.userID,
            postImage: postImage
        }

        await postStatus(object)
        await setModalOpen(false)
        setIsEditing(false)
        setCurrentPost(null) 
        await setStatus('') 
        getStatus((statuses) => {
            statuses.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            setAllStatuses(statuses)
        })
    }
    
    const getEditData = (posts) => {
        setModalOpen(true)
        setStatus(posts?.status)
        setCurrentPost(posts)
        setIsEditing(true)
    }

    const updateStatus = () => {
        updatePost(currentPost.id, status, postImage)
        setModalOpen(false)
        setIsEditing(false)
        setCurrentPost(null)
        setStatus('')
        getStatus((statuses) => {
            statuses.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            setAllStatuses(statuses)
        })
    }

    useMemo(() => {
        getStatus((statuses) => {
            statuses.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            setAllStatuses(statuses)
        })
    }, [])

    return (
        <section className="post-status-main">
            <div className="user-home-details">
                <img
                    className="user-image"
                    src={currentUser?.imageLink}
                    alt="user-image"
                />
                <p className="user-name">{currentUser?.name}</p>
                <p className="user-headline">{currentUser?.headline}</p>
            </div>
            <div className="post-status">
                <img
                    className="post-image"
                    src={currentUser?.imageLink}
                    alt="user-image"
                />
                <button
                    className="open-post-modal-btn"
                    onClick={() => {
                        setModalOpen(true)
                        setIsEditing(false)
                    }}
                >
                    Start a Post
                </button>
            </div>
            <ModalComponent
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                status={status}
                setStatus={setStatus}
                sendStatus={sendStatus}
                updateStatus={updateStatus}
                isEditing={isEditing}
                uploadPostImage={uploadPostImage}
                setPostImage={setPostImage}
                postImage={postImage}
                setCurrentPost={setCurrentPost}
                currentPost={currentPost}
            />

            {allStatuses.map((posts) => {
                return (
                    <PostsCard 
                        key={posts.id} 
                        posts={posts} 
                        getEditData={getEditData}
                    />
                )
            })}
        </section>
    )
}