import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { User, Post } from "../types";
import apiService from "../services/apiService";
import PostList from "../components/PostList";

const userApi = apiService<User>("users");
const postApi = apiService<Post>("posts");

const UserDetailsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(false);

  const userIdNum = userId ? parseInt(userId) : 0;

  useEffect(() => {
    if (userIdNum) {
      setLoading(true);
      setError(false);

      // Kullanıcı bilgisi
      userApi.getOne(userIdNum)
        .then(u => {
          if (!u) setError(true);
          else setUser(u);
        })
        .catch(() => setError(true))
        .finally(() => setLoading(false));

      // Kullanıcının postları
      postApi.getAll()
        .then(allPosts => setPosts(allPosts.filter(p => p.userId === userIdNum)))
        .catch(console.error);
    }
  }, [userIdNum]);

  const handleDeletePost = (id: number) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-center">
        <p className="text-lg font-semibold text-gray-700">Loading user data...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-center">
        <p className="text-lg font-semibold text-gray-700">
          User Information Not Found...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* User Info */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-5 text-center bg-white rounded-lg p-6 shadow-md">
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">@{user.username}</p>
        </div>
        <p className="text-gray-500">{user.email}</p>
      </div>

      {/* User Posts */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Posts by {user.username}</h2>

        {posts.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            There are no posts belonging to this user.
          </p>
        ) : (
          <PostList 
            posts={posts} 
            users={[user]} 
            onDelete={handleDeletePost} 
          />
        )}
      </div>
    </div>
  );
};

export default UserDetailsPage;
