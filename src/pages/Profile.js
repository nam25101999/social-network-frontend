import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyPosts from '../components/posts/MyPosts'; // 👈 Thêm dòng này
import CreatePost from '../components/posts/CreatePost'; // 👈 Thêm dòng này

const Profile = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3001/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message || 'Lỗi khi lấy thông tin.');
        } else {
          setErrorMessage('Lỗi hệ thống.');
        }
      }
    };

    fetchUserProfile();
  }, []);

  const handleEdit = () => {
    navigate('/profile/edit');
  };

  if (errorMessage) {
    return <div className="container mt-5"><div className="alert alert-danger">{errorMessage}</div></div>;
  }

  if (!user) {
    return <div className="container mt-5">Đang tải thông tin...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Thông tin cá nhân</h2>
      <ul className="list-group mt-3">
        <li className="list-group-item"><strong>Username:</strong> {user.username}</li>
        <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
        <li className="list-group-item"><strong>Full Name:</strong> {user.full_name || 'Ẩn'}</li>
        <li className="list-group-item"><strong>Số điện thoại:</strong> {user.phone || 'Ẩn'}</li>
        <li className="list-group-item"><strong>Giới tính:</strong> {user.gender || 'Ẩn'}</li>
        <li className="list-group-item"><strong>Ngày sinh:</strong> {user.birth_date || 'Ẩn'}</li>
      </ul>

      <button className="btn btn-warning mt-4" onClick={handleEdit}>
        ✏️ Chỉnh sửa thông tin
      </button>

      <hr className="my-5" />

      <CreatePost /> {/* 👈 Thêm form tạo bài viết */}
      <MyPosts />    {/* 👈 Thêm danh sách bài viết */}
    </div>
  );
};

export default Profile;
