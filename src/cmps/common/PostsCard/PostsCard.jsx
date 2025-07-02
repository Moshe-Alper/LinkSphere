import { LikeButton } from '../LinkButton/LikeButton'
import './PostsCard.scss'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, getAllUsers, deletePost, getConnections } from '../../../api/FirestoreAPI'
import { useEffect, useMemo, useState } from 'react'
import { BsPencil, BsTrash } from "react-icons/bs"
import { Modal } from 'antd'

export function PostsCard({ posts, getEditData }) {
    let navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const [allUsers, setAllUsers] = useState([])
    const [isConnected, setIsConnected] = useState(false)
    const [imageModal, setImageModal] = useState(false)

    useMemo(() => {
        getCurrentUser(setCurrentUser)
        getAllUsers(setAllUsers)
    }, [])
    useEffect(() => {
        getConnections(currentUser.userID, posts.userID, setIsConnected)
    }, [currentUser.userID, posts.userID])

    if (!(isConnected || currentUser?.userID === posts.userID)) {
        return <></>
    }

    const userImageLink = allUsers
        .filter((item) => item.id === posts.userID)
        .map((item) => item.imageLink)[0]
    return (
      <section className="posts-card">
        <header className="post-header">
          <div className="user-info">
            {userImageLink && (
              <img
                src={userImageLink}
                alt="profile-image"
                className="profile-image"
              />
            )}
            <div className="user-details">
              <p
                className="name"
                onClick={() =>
                  navigate("/profile", {
                    state: { id: posts?.userID, email: posts.userEmail },
                  })
                }
              >
                {posts.userName}
              </p>
              <p className="headline">
                {
                  allUsers.filter((user) => user.id === posts.userID)[0]
                    ?.headline
                }
              </p>
              <p className="timestamp">{posts.timestamp}</p>
            </div>
          </div>
          {currentUser?.userID === posts.userID && (
            <div className="action-container">
              <BsPencil
                size={30}
                className="action-icon"
                onClick={() => getEditData(posts)}
              />
              <BsTrash
                size={30}
                className="action-icon"
                onClick={() => deletePost(posts.id)}
              />
            </div>
          )}
        </header>
        <p className="status">{posts.status}</p>
        {posts.postImage && posts.postImage.trim() !== "" && (
          <img 
          className="post-image"
          src={posts.postImage} 
          alt="post-image" 
          onClick={() => setImageModal(true)}
          />
        )}
        <LikeButton
          userId={currentUser?.userID}
          postId={posts.id}
          currentUser={currentUser}
        />

        <Modal
          centered
          open={imageModal}
          onOk={() => setImageModal(false)}
          onCancel={() => setImageModal(false)}
          footer={[]}
        >
            {posts.postImage && (
                <img
                    className="post-image-modal"
                    src={posts.postImage}
                    alt="post-image-modal"
                />
            )}
        </Modal>
      </section>
    )
}