import { useState, useMemo } from "react"
import { postStatus, getStatus, updatePost } from "../../../api/FirestoreAPI"
import ModalComponent from "../Modal/ModalComponent"
import { PostsCard } from "../PostsCard/PostsCard"
import { getCurrentTimestamp } from "../../../helpers/useMoment"
import { getUniqueID } from "../../../helpers/getUniqueId"
import "./PostUpdate.scss"

export function PostStatus({ currentUser }) {
    const [modalOpen, setModalOpen] = useState(false)
    const [status, setStatus] = useState('')
    const [allStatuses, setAllStatuses] = useState([])
    const [currentPost, setCurrentPost] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    
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
            userID: currentUser?.userID
        }

        await postStatus(object)
        await setModalOpen(false)
        setIsEditing(false)
        setCurrentPost(null) 
        await setStatus('') 
        getStatus(setAllStatuses)

    }
    
    const getEditData = (posts) => {
        setModalOpen(true)
        setStatus(posts?.status)
        setCurrentPost(posts)
        setIsEditing(true)
    }

    const updateStatus = () => {
        updatePost(currentPost.id, status)
        setModalOpen(false)
        setIsEditing(false)
        setCurrentPost(null)
        setStatus('')
        getStatus(setAllStatuses)
    }

    useMemo(() => {
        getStatus(setAllStatuses)
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