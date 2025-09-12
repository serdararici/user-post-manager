import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { User, Post } from "../types";
import apiService from "../services/apiService";

const userApi = apiService<User>("users");
const postApi = apiService<Post>("posts");

const UserDetailsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const userIdNum = userId ? parseInt(userId) : 0;
  const [loading, setLoading] = useState(true); 
const [error, setError] = useState(false);

  useEffect(() => {
    if (userIdNum) {
        setLoading(true);
        setError(false);
          userApi.getOne(userIdNum)
      .then(u => {
        if (!u) {
          setError(true); // kullanıcı yoksa error
        } else {
          setUser(u);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));

    postApi.getAll()
      .then(allPosts => setPosts(allPosts.filter(p => p.userId === userIdNum)))
      .catch(console.error);
  }
}, [userIdNum]);

if (loading) {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] text-center">
      <p className="text-lg font-semibold text-gray-700">Loading...</p>
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
    <div className="p-6 space-y-6">
      <div className="flex flex-row justify-between items-center gap-5 text-center bg-white rounded-lg p-6">
            <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-600">@{user.username}</p>
            </div>
            <p className="text-gray-500">{user.email}</p>
        </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Posts by {user.username}</h2>
        <div className="grid gap-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white shadow rounded-lg p-4">
              <h3 className="font-bold">{post.title}</h3>
              <p className="text-gray-600">{post.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
