import { useState, useEffect, useMemo } from "react"
import { PostsCard } from "../PostsCard/PostsCard"
import { GoPencil } from "react-icons/go"
import "./ProfileCard.scss"
import { getSingleStatus, getSingleUser, getStatus, editProfile } from "../../../api/FirestoreAPI"
import { useLocation } from "react-router-dom"
import { uploadImage as uploadImageApi  } from "../../../api/ImageUpload"

export function ProfileCard({ currentUser, onEdit }) {
  let routerLocation = useLocation()
  
  const [allStatuses, setAllStatuses] = useState([])
  const [currentProfile, setCurrentProfile] = useState({})
  const [currentImage, setCurrentImage] = useState({})
  const [imageLink, setImageLink] = useState('')

  const uploadImage = () => {
    // Add validation before uploading
    if (!currentImage || !currentUser?.userID) {
      console.error('Missing image or user ID for upload')
      return
    }
    uploadImageApi(currentImage, currentUser.userID)
  }

  useEffect(() => {
    // Only run if currentUser exists and has required properties
    if (!currentUser || !currentUser.userID) {
      return
    }

    // If there's routing state with specific user data, fetch that user's profile
    if (routerLocation?.state?.id) {
      getSingleStatus(setAllStatuses, routerLocation.state.id)
    } else {
      // If no specific user ID, fetch current user's statuses
      getStatus(setAllStatuses)
    }
    
    if (routerLocation?.state?.email) {
      getSingleUser(setCurrentProfile, routerLocation.state.email)
    } else {
      // If no specific email in state, set current user as the profile
      setCurrentProfile(currentUser)
    }
  }, [routerLocation, currentUser]) // Make sure currentUser is in dependencies

  useEffect(() => {
    // Only run if we have both userID and imageLink
    if (currentUser?.userID && imageLink) {
      editProfile(currentUser.userID, imageLink)
    }
  }, [imageLink, currentUser?.userID]) // Add currentUser.userID to dependencies

  // Check if currentProfile is the currentUser
  const isCurrentUserProfile = useMemo(() => {
    if (!currentProfile || Object.keys(currentProfile).length === 0) return true
    if (!currentUser?.email) return false
    return currentProfile.email === currentUser.email
  }, [currentProfile, currentUser])

  const getProfileValue = (key) => {
    return Object.values(currentProfile).length === 0
      ? currentUser?.[key] || '' // Add fallback for undefined currentUser
      : currentProfile?.[key] || ''
  }

  // Early return if currentUser is not loaded yet
  if (!currentUser || !currentUser.userID) {
    return (
      <div className="profile-card">
        <div className="loading">Loading profile...</div>
      </div>
    )
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

  const getImage = (ev) => {
    if (ev.target.files && ev.target.files[0]) {
      setCurrentImage(ev.target.files[0])
    }
  }

   return (
    <>
      <div className="profile-card">
        <div className="actions">
          {isCurrentUserProfile && (
            <GoPencil size="24px" className="edit-icon" onClick={onEdit} />
          )}
        </div>
        
        <div className="profile-header">
          <div className="profile-image-section">
            <div className="profile-image">
              {getProfileValue("imageLink") ? (
                <img 
                  src={getProfileValue("imageLink")} 
                  alt={`${name}'s profile`}
                  className="profile-img"
                />
              ) : (
                <div className="profile-placeholder">
                  {name ? name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
            </div>
            {isCurrentUserProfile && (
              <div className="image-upload-section">
                <input 
                  type="file" 
                  onChange={getImage}
                  accept="image/*"
                  id="image-upload"
                  className="image-upload-input"
                />
                <label htmlFor="image-upload" className="upload-label">
                  Change photo
                </label>
                {currentImage && (
                  <button onClick={uploadImage} className="upload-btn">
                    Upload
                  </button>
                )}
              </div>
            )}
          </div>
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