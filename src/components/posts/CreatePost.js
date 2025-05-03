import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content && !imageUrl) {
      setError('Nội dung hoặc hình ảnh là bắt buộc.');
      setMessage('');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // giả định đã lưu token khi đăng nhập

      const response = await axios.post(
        'http://localhost:3001/api/posts',
        { content, image_url: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setError('');
      setContent('');
      setImageUrl('');
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi không xác định.');
      setMessage('');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h3 className="mb-4">Tạo Bài Viết Mới</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Nội dung</label>
          <textarea
            className="form-control"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Viết gì đó..."
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Đường dẫn hình ảnh</label>
          <input
            type="text"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Đăng bài
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
