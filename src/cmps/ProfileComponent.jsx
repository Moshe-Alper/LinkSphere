import { ProfileCard } from "./common/ProfileCard/ProfileCard";

export function ProfileComponent({ currentUser }) {
    return (
        <div>
            <ProfileCard currentUser={currentUser}/>
        </div>
    )
}