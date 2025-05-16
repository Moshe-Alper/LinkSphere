import { useState, useMemo } from "react"
import { postStatus, getStatus } from "../../../api/FirestoreAPI"
import ModalComponent from "../Modal/ModalComponent"
import "./PostUpdate.css"
import { PostsCard } from "../PostsCard/PostsCard"

export function PostStatus() {
    const [modalOpen, setModalOpen] = useState(false)
    const [status, setStatus] = useState('')
    const [allStatuses, setAllStatuses] = useState([])

    const sendStatus = async () => {
        await postStatus(status)
        setModalOpen(false)
        setStatus('')
    }

    useMemo(() => {
        getStatus(setAllStatuses)
    }, [])

    return (
        <section className="post-status-main">
            <div className="post-status">
                <button className="open-post-modal-btn" onClick={() => setModalOpen(true)}>Start a Post</button>
            </div>
            <ModalComponent
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                status={status}
                setStatus={setStatus}
                sendStatus={sendStatus}
            />

            {allStatuses.map((posts) => {
                return (
                    <PostsCard key={posts.id} posts={posts} />
                )
            })}
        </section>
    )
}