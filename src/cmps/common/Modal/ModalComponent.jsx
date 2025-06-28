import "./ModalComponent.scss"
import { Button, Modal } from 'antd'
import { useRef, useState } from "react";
import { AiOutlinePicture } from 'react-icons/ai'

const ModalComponent = ({
  modalOpen,
  setModalOpen,
  setStatus,
  status,
  sendStatus,
  updateStatus,
  isEditing,
  uploadPostImage,
  setPostImage,
  postImage
}) => {
  const [showFileInput, setShowFileInput] = useState(false)
  const fileInputRef = useRef(null)
  const [progress, setProgress] = useState(0)

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <>
      <Modal
        title={isEditing ? "Update Post" : "Create a Post"}
        centered
        open={modalOpen}
        onOk={() => {
          setStatus("")
          setModalOpen(false)
          setShowFileInput(false)
          setPostImage("")
          setProgress(0)
        }}
        onCancel={() => {
          setStatus('')
          setModalOpen(false)
          setShowFileInput(false)
          setPostImage("")
          setProgress(0)
        }}
        footer={[
          <Button
            onClick={isEditing ? updateStatus : sendStatus}
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
          >
            {isEditing ? "Update" : "Post"}
          </Button>,
        ]}
      >
        <textarea
          className="modal-input"
          placeholder="What do you want to talk about"
          onChange={event => setStatus(event.target.value)}
          value={status}
          rows={4}
        />

        {postImage.length > 0 && (
          <img
            src={typeof postImage === "string" ? postImage : URL.createObjectURL(postImage)}
            alt="Post"
            className="modal-post-image"
            style={{ maxWidth: "100%", marginTop: 12, borderRadius: 8 }}
          />
        )}

        {progress > 0 && progress < 100 && (
          <div style={{ marginTop: 12 }}>
            <div style={{ width: "100%", background: "#f0f0f0", borderRadius: 4, height: 8 }}>
              <div
                style={{
                  width: `${progress}%`,
                  background: "#1890ff",
                  height: "100%",
                  borderRadius: 4,
                  transition: "width 0.3s"
                }}
              />
            </div>
            <div style={{ fontSize: 12, marginTop: 4 }}>{progress}%</div>
          </div>
        )}

        <button
          type="button"
          className="upload-image-btn"
          onClick={handleUploadClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 12,
          }}
        >
          <AiOutlinePicture size={24} className="picture-icon" />
          Upload Image
        </button>
        <input
          ref={fileInputRef}
          id="pic-upload"
          type="file"
          onChange={ev => uploadPostImage(ev.target.files[0], setPostImage, setProgress)}
          style={{ display: "none" }}
        />
      </Modal>
    </>
  )
}

export default ModalComponent