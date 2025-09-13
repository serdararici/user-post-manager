
import { useState, useEffect } from "react";
import PostList from "./PostList";
import PostModal from "./PostModal";
import apiService from "../services/apiService";
import type { Post, User } from "../types";

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

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

  const handleDeletePost = async (id: number) => {
    try {
      await postsApi.delete(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenModalForCreate = () => {
    setEditingPost(null);
    setModalOpen(true);
  };

  const handleOpenModalForEdit = (post: Post) => {
    setEditingPost(post);
    setModalOpen(true);
  };

  const handleSubmitPost = async (data: Omit<Post, "id">, id?: number) => {
    try {
      if (id) {
        // edit yapılacak
        const updatedPost = await postsApi.update(id, data);
        setPosts((prev) => prev.map((p) => (p.id === id ? updatedPost : p)));
      } else {
        // create 
        const newPost: Post = { ...data, id: Date.now() }; // geçici id veriyoruz
        const createdPost = await postsApi.create(newPost);
        setPosts((prev) => [createdPost, ...prev]);
      }
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
          onClick={handleOpenModalForCreate}
          className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors"
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
          onDelete={handleDeletePost}
          onEdit={handleOpenModalForEdit} // PostCard’a edit için prop geçilecek
        />
      ) : (
        <p className="text-gray-600">No posts available.</p>
      )}

      {/* Modal */}
      <PostModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editingPost || undefined}
        onSubmit={handleSubmitPost}
      />
    </div>
  );
};

export default HomePage;