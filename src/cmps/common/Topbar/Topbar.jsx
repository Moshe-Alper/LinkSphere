import './Topbar.css';
import LinkSphereLogo from '../../../assets/logo.png'
import { AiOutlineBell, AiOutlineHome, AiOutlineMessage, AiOutlineSearch, AiOutlineUserSwitch } from 'react-icons/ai';
import { BsBriefcase } from 'react-icons/bs';


export function Topbar() {
    return (
        <section className="top-bar-section">
            <img src={LinkSphereLogo} className="logo" alt="LinkSphere logo" />
            <nav className="nav-bar">
            <AiOutlineSearch size={30} className="react-icon" />
            <AiOutlineHome size={30} className="react-icon" />
            <AiOutlineUserSwitch size={30} className="react-icon" />
            <BsBriefcase size={30} className="react-icon" />
            <AiOutlineMessage size={30} className="react-icon" />
            <AiOutlineBell size={30} className="react-icon" />

            </nav>
        </section>
    )
}