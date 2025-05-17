import { useState } from 'react'
import { editProfile } from '../../../api/FirestoreAPI'
import './ProfileEdit.css'

export function ProfileEdit({ onEdit, currentUser }) {
    const [editInputs, setEditInputs] = useState({})

    const getInput = (ev) => {
        let { name, value } = ev.target
        let input = { [name]: value }
        setEditInputs({ ...editInputs, ...input })
    }

    const updateProfileData = async () => {
        await editProfile(currentUser?.userId, editInputs)
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
                />
                <input
                    onChange={getInput}
                    className="edit-input"
                    placeholder="Headline"
                    name="headline"
                />
                <input
                    onChange={getInput}
                    className="edit-input"
                    placeholder="Location"
                    name="location"
                />
                <input
                    onChange={getInput}
                    className="edit-input"
                    placeholder="Company"
                    name="company"
                />
                <input
                    onChange={getInput}
                    className="edit-input"
                    placeholder="College"
                    name="college"
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