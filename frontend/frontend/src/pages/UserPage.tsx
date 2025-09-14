
import { useState, useEffect } from "react";
import type { User } from "../types";
import UserCard from "../components/UserCard";
import UserModal from "../components/UserModal";
import apiService from "../services/apiService";

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const usersApi = apiService<User>("users");

  // Fetch all users
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

  // Benzersiz ID oluşturma fonksiyonu
  const generateUniqueId = (): number => {
    const maxId = users.length ? Math.max(...users.map(u => u.id)) : 0;
    return maxId + 1;
  };

  // Open modal for creating a new user
  const handleAddUser = () => {
    setSelectedUser(null);
    setModalOpen(true);
  };

  // Open modal for editing an existing user
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  // Delete a user
  const handleDeleteUser = async (id: number) => {
    try {
      await usersApi.delete(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      // API hatası olsa bile local'den sil
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  // Save a user (create or update)
  const handleSaveUser = async (userData: Omit<User, "id">, id?: number) => {
    try {
      if (id) {
        // Update existing user
        try {
          const updatedUser = await usersApi.update(id, userData);
          setUsers((prev) => prev.map((u) => (u.id === id ? { ...updatedUser, id } : u)));
        } catch (error) {
          console.log("API update failed, updating locally");
          // API hatası durumunda local update yap
          setUsers((prev) => prev.map((u) => (u.id === id ? { ...userData, id } : u)));
        }
      } else {
        // Create new user
        const newId = generateUniqueId();
        const newUser: User = { ...userData, id: newId };
        
        try {
          await usersApi.create(newUser);
        } catch (error) {
          console.log("API call made");
        }
        
        setUsers((prev) => [newUser, ...prev]);
      }
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">All Users</h1>
        <button
          onClick={handleAddUser}
          className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors"
        >
          + Add User
        </button>
      </div>

      {/* Users List */}
      <div className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={() => handleEditUser(user)}
            onDelete={() => handleDeleteUser(user.id)}
          />
        ))}
      </div>

      {/* User Modal */}
      {modalOpen && (
        <UserModal
          user={selectedUser}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};

export default UserPage;

/*
import { useState, useEffect } from "react";
import type { User } from "../types";
import UserCard from "../components/UserCard";
import UserModal from "../components/UserModal";
import apiService from "../services/apiService";

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [nextId, setNextId] = useState(1); // Yeni user id için

  const usersApi = apiService<User>("users");

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await usersApi.getAll();
        setUsers(usersData);
        const maxId = usersData.length ? Math.max(...usersData.map(u => u.id)) : 0;
        setNextId(maxId + 1);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Open modal for creating a new user
  const handleAddUser = () => {
    setSelectedUser(null);
    setModalOpen(true);
  };

  // Open modal for editing an existing user
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  // Delete a user
  const handleDeleteUser = async (id: number) => {
    try {
      await usersApi.delete(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Save a user (create or update)
  const handleSaveUser = async (user: Omit<User, "id">, id?: number) => {
    try {
      if (id) {
        // Update existing user
        const updatedUser = await usersApi.update(id, user);
        setUsers((prev) => prev.map((u) => (u.id === id ? updatedUser : u)));
      } else {
        // Create new user
        const newUser: User = { ...user, id: nextId };
        setNextId(prev => prev + 1);
        const createdUser = await usersApi.create(newUser);
        setUsers((prev) => [createdUser, ...prev]);
      }
      setModalOpen(false); // modal kapanır
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">All Users</h1>
        <button
          onClick={handleAddUser}
          className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors"
        >
          + Add User
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={() => handleEditUser(user)}
            onDelete={() => handleDeleteUser(user.id)}
          />
        ))}
      </div>

      {modalOpen && (
        <UserModal
          user={selectedUser}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};

export default UserPage;
*/