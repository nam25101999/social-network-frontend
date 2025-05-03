import React, { useEffect, useState } from 'react';
import axios from 'axios';

const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString('vi-VN', {
    hour12: false,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const CommentsSection = ({ postId, token }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/posts/${postId}/comments`);
      setComments(res.data.comments);
    } catch (err) {
      console.error('Lỗi khi lấy bình luận:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await axios.post(
        `http://localhost:3001/api/posts/${postId}/comments`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment('');
      fetchComments(); // Refresh comments
    } catch (err) {
      console.error('Lỗi khi gửi bình luận:', err);
    }
  };

  return (
    <div className="mt-3">
      {comments.map((cmt) => (
        <div key={cmt.id} className="border p-2 mb-2 rounded d-flex align-items-start">
          <img
            src={cmt.profile_picture || '/default-avatar.png'}
            alt="avatar"
            className="rounded-circle me-2"
            width="40"
            height="40"
          />
          <div>
            <div>
              <strong>{cmt.full_name}</strong>{' '}
              <small className="text-muted">{formatDateTime(cmt.created_at)}</small>
            </div>
            <div>{cmt.content}</div>
          </div>
        </div>
      ))}

      <div className="input-group mt-2">
        <input
          type="text"
          className="form-control"
          placeholder="Viết bình luận..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddComment}>
          Gửi
        </button>
      </div>
    </div>
  );
};

export default CommentsSection;
