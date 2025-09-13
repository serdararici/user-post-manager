import { useNavigate } from "react-router-dom";
import type { User } from "../types";

interface UserCardProps {
  user: User;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
      onClick={() => navigate(`/users/${user.id}`)}
    >
      <div className="flex flex-row items-center justify-between gap-4">
        <span className="font-semibold text-lg text-gray-700">{user.id}</span>
        <div className="flex flex-row items-center justify-between gap-2">
          <h2 className="font-bold text-lg">{user.name}</h2>
          <p className="text-sm text-gray-500">@{user.username}</p>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
      </div>

      <div
        className="flex gap-4"
        onClick={(e) => e.stopPropagation()} // butona tıklayınca navigate olmasın
      >
        <button
          className="btn btn-sm hover:underline transition cursor-pointer"
          onClick={() => navigate(`/users/${user.id}`)}
        >
          View
        </button>
        <button
          className="btn btn-sm hover:underline transition cursor-pointer"
          onClick={() => onEdit?.(user.id)}
        >
          Edit
        </button>
        <button
          className="btn btn-sm hover:underline transition cursor-pointer"
          onClick={() => onDelete?.(user.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
