import React from 'react';
import { Button, Modal } from 'antd';
import "./ModalComponent.scss"

const ModalComponent = ({ modalOpen, setModalOpen, setStatus, status, sendStatus, updateStatus, isEditing }) => {

  return (
    <>
      <Modal
        title={isEditing ? "Update Post" : "Create a Post"}
        centered
        open={modalOpen}
        onOk={() => {
          setStatus("")
          setModalOpen(false)
        }}
        onCancel={() => {
          setStatus(false)
          setModalOpen(false)
        }}
        footer={[
          <Button
            onClick={isEditing ? updateStatus : sendStatus}
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
          >
            {isEditing ? "Update" : "Post"}
          </Button>
        ]}
      >
        <input
          className="modal-input"
          type="text"
          placeholder="What do you want to talk about"
          onChange={(event) => setStatus(event.target.value)}
          value={status}
        />
      </Modal>
    </>
  );
};

export default ModalComponent