import PostCard from "./PostCard";
import type { Post, User } from "../types";

interface PostListProps {
  posts: Post[];
  users: User[];
  onDelete: (id: number) => void;
  onEdit?: (post: Post) => void;
}

const PostList = ({ posts, users, onDelete, onEdit }: PostListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map(post => {
        const user = users.find(u => u.id === post.userId);
        return (
          <PostCard
            key={post.id}
            post={post}
            username={user?.name}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        );
      })}
    </div>
  );
};

export default PostList;
