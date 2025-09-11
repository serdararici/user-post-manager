import type React from "react";
import { useState, useEffect } from "react";
import UserList from "./UserList";
import PostList from "./PostList";
import apiService from "../services/apiService";
import type { User, Post } from "../types";


const HomePage: React.FC = () => {
const [users, setUsers] = useState<User[]>([]);
const [posts, setPosts] = useState<Post[]>([]);

  const usersApi = apiService<User>("users");
  const postsApi = apiService<Post>("posts");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, postsData] = await Promise.all([
          usersApi.getAll(),
          postsApi.getAll(),
        ]);

        setUsers(usersData);
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handlers for CRUD operations
    const handleDeleteUser = async (id: number) => {
    await usersApi.delete(id);
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const handleEditUser = async (user: User) => {
    const updatedUser = await usersApi.update(user.id, user);
    setUsers(prev => prev.map(u => (u.id === user.id ? updatedUser : u)));
  };

  const handleCreateUser = async (newUser: User) => {
    const createdUser = await usersApi.create(newUser);
    setUsers(prev => [...prev, createdUser]);
  };

  const handleDeletePost = async (id: number) => {
    await postsApi.delete(id);
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const handleEditPost = async (post: Post) => {
    const updatedPost = await postsApi.update(post.id, post);
    setPosts(prev => prev.map(p => (p.id === post.id ? updatedPost : p)));
  };

  const handleCreatePost = async (newPost: Post) => {
    const createdPost = await postsApi.create(newPost);
    setPosts(prev => [...prev, createdPost]);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600 underline">
        Home Page
      </h1>
      <UserList users={users} />
      <PostList posts={posts} />
    </div>
  );
};
export default HomePage;