import { useState, useEffect } from "react";
import type { User } from "../types";

interface UserModalProps {
  user: User | null;
  open?: boolean;
  onClose: () => void;
  onSave: (userData: Omit<User, "id">, id?: number) => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose, onSave, open = true }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // Modal açıldığında verileri set et
  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
      setEmail(user.email);
    } else {
      setName("");
      setUsername("");
      setEmail("");
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, username, email }, user?.id);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{user ? "Edit User" : "Add New User"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-950"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
