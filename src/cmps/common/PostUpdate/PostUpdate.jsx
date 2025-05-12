import { useState } from "react"
import "./PostUpdate.css"
import ModalComponent from "../Modal/ModalComponent"

export function PostStatus() {
    const [modalOpen, setModalOpen] = useState(false)
    const [status, setStatus] = useState('')
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
            />
        </section>
    )
}