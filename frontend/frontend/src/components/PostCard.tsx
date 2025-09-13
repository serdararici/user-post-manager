import apiService from "../services/apiService"; // Post servisimiz
import { useState, useEffect, useRef } from "react";
import { FiMoreVertical } from "react-icons/fi";
import type { Post } from "../types";

interface PostCardProps {
  post: Post;
  username?: string;
  onDelete?: (id: number) => void; // parent component'e bildir
}

const PostCard = ({ post, username, onDelete }: PostCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const postsApi = apiService<Post>("posts");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteClick = () => {
    setModalOpen(true);
    setMenuOpen(false);
  };

  const confirmDelete = async () => {
    try {
      console.log("Attempting to delete", post.id);
      await postsApi.delete(post.id);
    } catch (error) { // JSONPlaceholder kullanışdığı için hata vermesi normal
      console.log("API delete failed (expected with JSONPlaceholder):", error);
    }
    
    if (onDelete) {
      console.log("Deleting", post.id);
      onDelete(post.id);
    }
    setModalOpen(false);
  };

  const cancelDelete = () => {
    setModalOpen(false);
  };

  return (
    <div className="relative w-full bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow">
      {/* Menü ikonu */}
      <div ref={menuRef} className="absolute top-4 right-4">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1 text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100"
        >
          <FiMoreVertical size={20} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg flex flex-col z-10">
            <button className="px-3 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors">
              Edit
            </button>
            <button
              className="px-3 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-1">{post.title}</h2>
      <p className="text-gray-500 text-sm mb-3">by {username ?? "Unknown"}</p>
      <p className="text-gray-600 mb-10">{post.body}</p>

      <div className="absolute bottom-4 right-4">
        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
          See Details
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <dialog className="modal modal-open">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Delete Post</h3>
            <p className="py-4">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="modal-action">
              <button className="btn" type="button" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="btn btn-error" type="button" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default PostCard;
