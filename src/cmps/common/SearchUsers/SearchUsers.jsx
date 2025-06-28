import "./SearchUsers.scss"
import { AiOutlineCloseCircle } from "react-icons/ai"

export function SearchUsers({ setIsSearch, setSearchInput }) {

    return (
        <section className="search-users">
            <input 
            type="text" 
            className="search-users-input" 
            placeholder="Search Users..."
            onChange={(ev) => setSearchInput(ev.target.value)}
            />
            <AiOutlineCloseCircle 
            className="close-icon"
            size={20} 
            onClick={() => {
                setIsSearch(false)
                setSearchInput("")
            }} 
            />
        </section>
    )
}