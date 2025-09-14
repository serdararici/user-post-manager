
import React, { useState, useEffect } from "react";
import type { Post } from "../types";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: Omit<Post, "id">, id?: number) => void;
  initialData?: Post; // edit için
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [body, setBody] = useState(initialData?.body || "");

  const handleSubmit = () => {
    if (!title.trim() || !body.trim()) return;
    onSubmit({ title, body, userId: initialData?.userId || 1 }, initialData?.id);
    onClose();
    setTitle("");
    setBody("");
  };

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setBody(initialData.body);
    }
  }, [initialData]);


  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">{initialData ? "Edit Post" : "Create New Post"}</h3>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Post Title"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Post Body"
            className="textarea textarea-bordered w-full"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {initialData ? "Save Changes" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
