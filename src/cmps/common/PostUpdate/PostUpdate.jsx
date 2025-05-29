import { useState, useMemo } from "react"
import { postStatus, getStatus } from "../../../api/FirestoreAPI"
import ModalComponent from "../Modal/ModalComponent"
import { PostsCard } from "../PostsCard/PostsCard"
import { getCurrentTimestamp } from "../../../helpers/useMoment"
import { getUniqueID } from "../../../helpers/getUniqueId"
import "./PostUpdate.css"

export function PostStatus({ currentUser }) {
    let userEmail = localStorage.getItem('userEmail')
    const [modalOpen, setModalOpen] = useState(false)
    const [status, setStatus] = useState('')
    const [allStatuses, setAllStatuses] = useState([])

    const sendStatus = async () => {
        let object = {
            status: status,
            timestamp: getCurrentTimestamp("LLL"),
            userEmail: currentUser.email,
            userName: currentUser.name,
            postID: getUniqueID(),
        }

        await postStatus(object)
        await setModalOpen(false)
        await setStatus('')
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