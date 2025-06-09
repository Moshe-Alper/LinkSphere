import { useState, useEffect, useMemo } from "react"
import { ProfileEdit } from "../ProfileEdit/ProfileEdit"
import { PostsCard } from "../PostsCard/PostsCard"
import { GoPencil } from "react-icons/go"
import "./ProfileCard.scss"
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
  const city = getProfileValue("city")
  const country = getProfileValue("country")
  const college = getProfileValue("college")
  const company = getProfileValue("company")
  const website = getProfileValue("website")
  const about = getProfileValue("aboutMe")
  const skills = getProfileValue("skills")
    
  return (
    <>
      <div className="profile-card">
        <div className="actions">
          {isCurrentUserProfile && (
            <GoPencil size="24px" className="edit-icon" onClick={onEdit} />
          )}
        </div>
        <div className="profile-info">
          <div className="left">
            <h3 className="user-name">{name}</h3>
            {headline && <p className="heading">{headline}</p>}
            {(city || country) && (
              <p>
                {city}
                {city && country ? ", " : ""}
                {country}
              </p>
            )}
            {website && (
              <p>
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {website}
                </a>
              </p>
            )}
            {currentProfile.tag && (
              <span className="profile-tag">{currentProfile.tag}</span>
            )}
            {about && (
              <div className="about-me">
                <p>{about}</p>
              </div>
            )}
            {skills && skills.length > 0 && (
              <div className="skills">
                <ul>
                  <span>Skills:</span>: {skills}
                </ul>
              </div>
            )}
          </div>
          <div className="right">
            {college && <p>{college}</p>}
            {company && <p>{company}</p>}
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