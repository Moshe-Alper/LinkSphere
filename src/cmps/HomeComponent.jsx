import { PostStatus } from "./common/PostUpdate/PostUpdate"

export default function HomeComponent({ currentUser }) {
    return (
        <section className="home-component">
            <PostStatus currentUser={currentUser} />
        </section>
    )
}