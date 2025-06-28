import "./Topbar.scss"
import LinkSphereLogo from "../../../assets/logo.png"
import { AiOutlineBell, AiOutlineHome, AiOutlineMessage, AiOutlineSearch, AiOutlineUserSwitch } from "react-icons/ai"
import { BsBriefcase } from "react-icons/bs"
import user from "../../../assets/user.png"
import { useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import { ProfilePopup } from "../ProfilePopup/ProfilePopup"
import { SearchUsers } from "../SearchUsers/SearchUsers"
import { getAllUsers } from "../../../api/FirestoreAPI"
import { useEffect } from "react"

export function Topbar() {
    let navigate = useNavigate()
    const goToRoute = (route) => {
        navigate(route)
    }
    const [isProfilePopupOpen, setProfilePopupOpen] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [allUsers, setAllUsers] = useState([])
    const [debouncedSearchInput, setDebouncedSearchInput] = useState('')
    const debounceTimeout = useRef(null)

    const handleUserImgClick = () => {
        setProfilePopupOpen((prev) => !prev)
    }

    useEffect(() => {
        getAllUsers(setAllUsers)
    }, [])

    useEffect(() => {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
        debounceTimeout.current = setTimeout(() => {
            setDebouncedSearchInput(searchInput)
        }, 1000)
        return () => clearTimeout(debounceTimeout.current)
    }, [searchInput])

    const handleSearch = () => {
        if (!debouncedSearchInput) return []
        return allUsers.filter(user =>
            user.name?.toLowerCase().includes(debouncedSearchInput.toLowerCase())
        )
    }

    const searchResults = handleSearch()

    return (
        <section className="top-bar-section">
            <img src={LinkSphereLogo} className="logo" alt="LinkSphere logo" />

            <div className={`center-bar${isSearch ? " search-mode" : ""}`}>
                {isSearch ? (
                    <div className="search-users">
                        <SearchUsers 
                            setIsSearch={setIsSearch} 
                            setSearchInput={setSearchInput}
                        />
                    </div>
                ) : (
                    <nav className="nav-bar">
                        <AiOutlineSearch size={30} className="react-icon" onClick={() => setIsSearch(true)} />
                        <AiOutlineHome size={30} className="react-icon" onClick={() => goToRoute('/home')} />
                        <AiOutlineUserSwitch size={30} className="react-icon" onClick={() => goToRoute('/connections')} />
                        <BsBriefcase size={30} className="react-icon" />
                        <AiOutlineMessage size={30} className="react-icon" />
                        <AiOutlineBell size={30} className="react-icon" />
                    </nav>
                )}
            </div>

            <img
                src={user}
                className="user-img"
                alt="LinkSphere User"
                onClick={handleUserImgClick}
                style={{ cursor: "pointer" }}
            />
            {isProfilePopupOpen && (
                <ProfilePopup onClose={() => setProfilePopupOpen(false)} />
            )}

            {isSearch && debouncedSearchInput.length > 0 && (
                <div className="search-results">
                    {searchResults.length > 0 ? (
                        searchResults.map(user => (
                            <div key={user.id} className="search-result-item">
                                <img src={user.imageLink || user} alt={user.name} className="result-user-img" />
                                <span>{user.name}</span>
                            </div>
                        ))
                    ) : (
                        <div className="no-results-found">No results found</div>
                    )}
                </div>
            )}
        </section>
    )
}