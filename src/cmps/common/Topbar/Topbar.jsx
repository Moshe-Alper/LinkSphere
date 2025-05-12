import "./Topbar.css";
import LinkSphereLogo from "../../../assets/logo.png"
import { AiOutlineBell, AiOutlineHome, AiOutlineMessage, AiOutlineSearch, AiOutlineUserSwitch } from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import user from "../../../assets/user.png"
import { useNavigate } from "react-router-dom";


export function Topbar() {
    let navigate = useNavigate()
    const goToRoute = (route) => {
        navigate(route)
    }
    return (
        <section className="top-bar-section">
            <img src={LinkSphereLogo} className="logo" alt="LinkSphere logo" />
            <nav className="nav-bar">
                <AiOutlineSearch size={30} className="react-icon" />
                <AiOutlineHome size={30} className="react-icon" onClick={() => goToRoute('/home')} />
                <AiOutlineUserSwitch size={30} className="react-icon" onClick={() => goToRoute('/profile')} />
                <BsBriefcase size={30} className="react-icon" />
                <AiOutlineMessage size={30} className="react-icon" />
                <AiOutlineBell size={30} className="react-icon" />

            </nav>
            <img src={user} className="user-img" alt="LinkSphere User" />

        </section>
    )
}