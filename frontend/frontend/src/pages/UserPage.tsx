
import { useState, useEffect } from "react";
import type { User } from "../types";
import UserCard from "../components/UserCard";
import apiService from "../services/apiService";

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const usersApi = apiService<User>("users");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await usersApi.getAll();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <div className="grid grid-cols-1 justify-content-center gap-4"> //md:grid-cols-2 lg:grid-cols-3
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserPage;
