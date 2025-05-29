import './ProfilePopup.css'
import { onLogout } from '../../../api/AuthAPI'
import { useNavigate } from 'react-router-dom'
export function ProfilePopup() {
    const navigate = useNavigate();

    return (
        <section className="profile-popup">
            <ul className="popup-options">
                <li className="popup-options" onClick={() => navigate('/profile')}>Profile</li>
                <li className="popup-options" onClick={onLogout}>Logout</li>
            </ul>
        </section>
    )
}