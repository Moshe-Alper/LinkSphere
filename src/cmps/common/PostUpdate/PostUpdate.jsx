import { useState } from "react"
import ModalComponent from "../Modal/ModalComponent"
import { postStatus } from "../../../api/FirestoreAPI"
import "./PostUpdate.css"

export function PostStatus() {
    const [modalOpen, setModalOpen] = useState(false)
    const [status,  setStatus] = useState('')
    const sendStatus = async () => {
        await postStatus(status)
        await setModalOpen(false)
        await setStatus('')
    } 
    return (
        <section className="post-status-main">
            <div className="post-status">
                <button className="open-post-modal-btn" onClick={() => setModalOpen(true)}>Start a Post</button>
            </div>
            <ModalComponent 
            modalOpen={modalOpen} 
            setModalOpen={setModalOpen} 
            status= {status}
            setStatus={setStatus}
            sendStatus={sendStatus}
            />
        </section>
    )
}