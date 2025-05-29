import { useState, useMemo } from "react";
import { ProfileEdit } from "../ProfileEdit/ProfileEdit";
import { PostsCard } from "../PostsCard/PostsCard";
import "./ProfileCard.css";
import { getStatus } from "../../../api/FirestoreAPI";

export function ProfileCard({ currentUser, onEdit }) {
  const [allStatuses, setAllStatuses] = useState([])

      useMemo(() => {
          getStatus(setAllStatuses)
      }, [])

  const { name, email, headline, location, college, company } = currentUser

  return (
    <>
      <div className="profile-card">
        <div className="actions">
          <button onClick={onEdit} className="edit-btn">
            Edit
          </button>
        </div>
        <div className="profile-info">
          <div className="left">
            <h3 className="user-name">{name}</h3>
            {headline && <p className="heading">{headline}</p>}
            {location && <p>{location}</p>}
          </div>
          <div className="right">
            {college && <p>{college}</p>}
            {company && <p>{company}</p>}
          </div>
        </div>

        <div className="post-status-main">
            {allStatuses
                .filter((item) => {
                    return item.userEmail === localStorage.getItem("userEmail")
                })
                .map((posts) => {
                return (
                    <div key={posts.id}>
                        <PostsCard posts={posts} />
                    </div>
                )
            })}
        </div>
      </div>
    </>
  )
}
