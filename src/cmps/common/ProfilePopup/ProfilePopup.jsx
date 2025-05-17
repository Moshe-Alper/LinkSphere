import './ProfilePopup.css'
import { onLogout } from '../../../api/AuthAPI'
export function ProfilePopup() {
    return (
        <section className="profile-popup">
            <ul className="popup-options">
                <li className="popup-options" onClick={onLogout}>Logout</li>
            </ul>
        </section>
    )
}