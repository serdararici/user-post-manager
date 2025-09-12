import type { Post } from "../types";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => { 
    return (
    <div className="card w-96 bg-base-100 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p>{post.body}</p>
        <div className="justify-end card-actions">
          <button className="btn btn-primary">Read More</button>
        </div>
      </div>
    </div>
  );
}
export default PostCard;