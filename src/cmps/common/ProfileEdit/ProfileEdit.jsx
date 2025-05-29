import { useState } from 'react'
import { editProfile } from '../../../api/FirestoreAPI'
import './ProfileEdit.css'

export function ProfileEdit({ onEdit, currentUser }) {
    const [editInputs, setEditInputs] = useState({
        name: currentUser?.name || '',
        headline: currentUser?.headline || '',
        location: currentUser?.location || '',
        company: currentUser?.company || '',
        college: currentUser?.college || ''
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
                <button onClick={onEdit} className="edit-btn">Go back</button>
            </div>
            <div className="profile-edit-inputs">
                <input
                    onChange={getInput}
                    className="edit-input"
                    placeholder="Name"
                    name="name"
                    value={editInputs.name}
                />
                <input
                    onChange={getInput}
                    className="edit-input"
                    placeholder="Headline"
                    name="headline"
                    value={editInputs.headline}
                />
                <input
                    onChange={getInput}
                    className="edit-input"
                    placeholder="Location"
                    name="location"
                    value={editInputs.location}
                />
                <input
                    onChange={getInput}
                    className="edit-input"
                    placeholder="Company"
                    name="company"
                    value={editInputs.company}
                />
                <input
                    onChange={getInput}
                    className="edit-input"
                    placeholder="College"
                    name="college"
                    value={editInputs.college}
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