import React from 'react';
import { Button, Modal } from 'antd';
import "./ModalComponent.scss"

const ModalComponent = ({ modalOpen, setModalOpen, setStatus, status }) => {


  return (
    <>

      <Modal
        title="Create a Post"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button key="submit" type="primary" disabled={status.length > 0 ? false : true}>
            Post
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