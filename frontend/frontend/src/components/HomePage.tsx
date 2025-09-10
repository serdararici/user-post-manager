import type React from "react";
import { useState, useEffect } from "react";
import UserList from "./UserList";
import PostList from "./PostList";
import apiService from "../services/apiService";
import type { User, Post } from "../types";


const HomePage: React.FC = () => {
const [users, setUsers] = useState<User[]>([]);
const [posts, setPosts] = useState<Post[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersApi = apiService<User>("users");
        const postsApi = apiService<Post>("posts");

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

  return (
    <div>
      <h1>Home Page</h1>
      <UserList users={users} />
      <PostList posts={posts} />
    </div>
  );
};
export default HomePage;