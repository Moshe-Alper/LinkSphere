import { useState } from 'react'
import { editProfile } from '../../../api/FirestoreAPI'
import { IoMdClose } from "react-icons/io";

import './ProfileEdit.scss'

export function ProfileEdit({ onEdit, currentUser }) {

    const [editInputs, setEditInputs] = useState({
        name: currentUser?.name || '',
        headline: currentUser?.headline || '',
        company: currentUser?.company || '',
        industry: currentUser?.industry || '',
        country: currentUser?.country || '',
        city: currentUser?.city || '',
        college: currentUser?.college || '',
        website: currentUser?.website || '',
        aboutMe: currentUser?.aboutMe || '',
        skills: currentUser?.skills || ''
    })

    const getInput = (ev) => {
        let { name, value } = ev.target
        setEditInputs({ ...editInputs, [name]: value })
    }

    const updateProfileData = async () => {
        await editProfile(currentUser?.userID, editInputs)
        await onEdit()
    }

    return (
        <div className="profile-card">
            <div className="actions">
                 <IoMdClose className="close-icon" size={24} onClick={onEdit} />
            </div>
            <div className="profile-edit-inputs">
                <label htmlFor="edit-name">Name</label>
                <input
                    id="edit-name"
                    onChange={getInput}
                    className="edit-input"
                    placeholder="Name"
                    name="name"
                    value={editInputs.name}
                />
                <label htmlFor="edit-headline">Headline</label>
                <input
                    id="edit-headline"
                    onChange={getInput}
                    className="edit-input"
                    placeholder="Headline"
                    name="headline"
                    value={editInputs.headline}
                />
                <label htmlFor="edit-company">Company</label>
                <input
                    id="edit-company"
                    onChange={getInput}
                    className="edit-input"
                    placeholder="Company"
                    name="company"
                    value={editInputs.company}
                />
                <label htmlFor="edit-industry">Industry</label>
                <input
                    id="edit-industry"
                    onChange={getInput}
                    className="edit-input"
                    placeholder="Industry"
                    name="industry"
                    value={editInputs.industry}
                />
                <label htmlFor="edit-college">College</label>
                <input
                    id="edit-college"
                    onChange={getInput}
                    className="edit-input"
                    placeholder="College"
                    name="college"
                    value={editInputs.college}
                />
                <label htmlFor="edit-country">Country</label>
                <input
                    id="edit-country"
                    onChange={getInput}
                    className="edit-input"
                    placeholder="country"
                    name="country"
                    value={editInputs.country}
                />
                <label htmlFor="edit-city">City</label>
                <input
                    id="edit-city"
                    onChange={getInput}
                    className="edit-input"
                    placeholder="City"
                    name="city"
                    value={editInputs.city}
                />
                <label htmlFor="edit-website">Website</label>
                <input
                    id="edit-website"
                    onChange={getInput}
                    className="edit-input"
                    placeholder="Website"
                    name="website"
                    value={editInputs.website}
                />
                <label htmlFor="edit-about">About</label>
                    <textarea
                    id="edit-aboutMe"
                    onChange={getInput}
                    className="edit-input"
                    placeholder="About Me"
                    rows={4}
                    cols={5}
                    name="aboutMe"
                    value={editInputs.aboutMe}
                />
                 <label htmlFor="edit-skills">Skills</label>
                <input
                    id="edit-skills"
                    onChange={getInput}
                    className="edit-input"
                    placeholder="Skills"
                    name="skills"
                    value={editInputs.skills}
                />
            </div>
               
            <div className="save-wrapper">
                <button
                    className="save-btn"
                    onClick={updateProfileData}
                >Save</button>
            </div>
        </div>
    )
}