import { useState, useEffect } from "react";
import PostList from "./PostList";
import apiService from "../services/apiService";
import type { Post, User } from "../types";

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const postsApi = apiService<Post>("posts");
  const usersApi = apiService<User>("users");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postsData, usersData] = await Promise.all([
          postsApi.getAll(),
          usersApi.getAll(),
        ]);
        setPosts(postsData);
        setUsers(usersData);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handlers for CRUD operations
  const handleDeletePost = async (id: number) => {
    try {
      await postsApi.delete(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditPost = async (post: Post) => {
    try {
      const updatedPost = await postsApi.update(post.id, post);
      setPosts((prev) => prev.map((p) => (p.id === post.id ? updatedPost : p)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreatePost = async () => {
    try {
      const newPost: Post = {
        id: Date.now(), // geçici id
        userId: 1,     // demo user
        title: "New Post",
        body: "This is a newly created post.",
      };
      const createdPost = await postsApi.create(newPost);
      setPosts((prev) => [createdPost, ...prev]); // en üste ekle
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-900">All Posts</h1>
          <p className="text-gray-600">Browse the latest posts from all users</p>
        </div>
        <button
          onClick={handleCreatePost}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Post
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-gray-500">Loading posts...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : posts.length > 0 ? (
        <PostList 
          posts={posts}
          users={users}
          onDelete={handleDeletePost} />
      ) : (
        <p className="text-gray-600">No posts available.</p>
      )}
    </div>
  );
};

export default HomePage;
