import './PostsCard.css'

export function PostsCard({ posts}) {
    return (
        <section className="posts-card">
            <p className="name">{posts.userName}</p>
            <p className="timestamp ">{posts.timestamp}</p>
            <p className="status">{posts.status}</p>
        </section>
    )
}