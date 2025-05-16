import './PostsCard.css'

export function PostsCard({ posts }) {
    return (
        <section className="posts-card">
            <p>{posts.status}</p>
        </section>
    )
}