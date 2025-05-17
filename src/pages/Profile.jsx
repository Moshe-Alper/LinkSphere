import { ProfileComponent } from "../cmps/ProfileComponent";

export function Profile({ currentUser }) {
    return <ProfileComponent currentUser={currentUser} />
}