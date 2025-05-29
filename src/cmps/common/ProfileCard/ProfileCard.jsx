import { useState, useEffect, useMemo } from "react"
import { ProfileEdit } from "../ProfileEdit/ProfileEdit"
import { PostsCard } from "../PostsCard/PostsCard"
import "./ProfileCard.css"
import { getSingleStatus, getSingleUser, getStatus } from "../../../api/FirestoreAPI"
import { useLocation } from "react-router-dom"

export function ProfileCard({ currentUser, onEdit }) {
  let routerLocation = useLocation()
  
  const [allStatuses, setAllStatuses] = useState([])
  const [currentProfile, setCurrentProfile] = useState({})

  useEffect(() => {
    // If there's routing state with specific user data, fetch that user's profile
    if (routerLocation?.state?.id) {
      getSingleStatus(setAllStatuses, routerLocation?.state?.id)
    } else {
      // If no specific user ID, fetch current user's statuses
      getStatus(setAllStatuses)
    }
    
    if (routerLocation?.state?.email) {
      getSingleUser(setCurrentProfile, routerLocation?.state?.email)
    } else {
      // If no specific email in state, set current user as the profile
      setCurrentProfile(currentUser)
    }
  }, [routerLocation, currentUser])

  // Check if currentProfile is the currentUser
  const isCurrentUserProfile = useMemo(() => {
    if (!currentProfile || Object.keys(currentProfile).length === 0) return true
    return currentProfile.email === currentUser.email
  }, [currentProfile, currentUser])

  const getProfileValue = (key) => {
    return Object.values(currentProfile).length === 0
      ? currentUser[key]
      : currentProfile?.[key]
  }

  const name = getProfileValue("name")
  const headline = getProfileValue("headline")
  const location = getProfileValue("location")
  const college = getProfileValue("college")
  const company = getProfileValue("company")
    
  return (
  <>
    <div className="profile-card">
      <div className="actions">
        {isCurrentUserProfile && (
          <button onClick={onEdit} className="edit-btn">
            Edit
          </button>
        )}
      </div>
      <div className="profile-info">
        <div className="left">
          <h3 className="user-name">{name}</h3>
          {isCurrentUserProfile && headline && <p className="heading">{headline}</p>}
          {isCurrentUserProfile && location && <p>{location}</p>}
        </div>
        <div className="right">
          {isCurrentUserProfile && college && <p>{college}</p>}
          {isCurrentUserProfile && company && <p>{company}</p>}
        </div>
      </div>
      
      <div className="post-status-main">
        {allStatuses
          .filter((item) => item.userEmail === getProfileValue("email"))
          .map((posts) => (
            <div key={posts.id}>
              <PostsCard posts={posts} />
            </div>
          ))}
      </div>
    </div>
  </> 
)
}