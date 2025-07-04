import "./ProfilePopup.scss"
import { onLogout } from "../../../api/AuthAPI.jsx"
import { useNavigate } from 'react-router-dom'
import { Button } from '../Button/Button';
import {getCurrentUser } from '../../../api/FirestoreAPI.jsx'
import { useMemo, useState } from 'react';

export function ProfilePopup() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null)

    useMemo(() => {
        getCurrentUser(setCurrentUser);
    }, [])

    if (!currentUser) return 
    return (
        <section className="popup-card">
            <p className="name">{currentUser?.name}</p>
            <p className="headline">{currentUser?.headline}</p>
            <ul className="popup-options">
            <Button 
            className="common-btn"
            title="View-Profile" 
            onClick={() => navigate("/profile")}
            />
            <Button 
            title="Logout" 
            onClick={onLogout}
            />
            </ul>
        </section>
    )
}