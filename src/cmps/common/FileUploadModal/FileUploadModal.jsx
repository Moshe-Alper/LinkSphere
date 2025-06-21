import "./FileUploadModal.scss";
import { Button, Modal, Progress } from "antd";

export function FileUploadModal({ modalOpen, setModalOpen, getImage, uploadImage, currentImage, progress }) {

    return (
        <div>
            <Modal
                title="Add a Profile Image"
                centered
                open={modalOpen}
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
                footer={
                    <Button disabled={currentImage.name ? false : true } type="primary" key="submit" onClick={uploadImage}> 
                        Upload Profile Picture
                    </Button>
                }
            >
                <div>
                    <label htmlFor="image-upload" className="image-upload-label" style={{ cursor: "pointer" }}>
                        Add an Image
                    </label>
                    <input 
                        type="file" 
                        onChange={getImage}
                        accept="image/*"
                        id="image-upload"
                        className="image-upload-input"
                        style={{ display: "none" }}
                    />
                    {currentImage && currentImage.name && (
                        <div className="selected-file-name">
                            {currentImage.name}
                        </div>
                    )}
                       <Progress/>

                </div>
            </Modal>
        </div>
    )
}
