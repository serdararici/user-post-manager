import type { User } from "../types";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="card w-96 bg-base-100 shadow-sm">
      <div className="card-body">
        <h1>{user.id}</h1> 
        <h2 className="card-title font-bold">{user.name}, {user.username}</h2>
        <p>{user.email}</p>
        <div className="justify-end card-actions">
          <button className="btn btn-primary">View Profile</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
