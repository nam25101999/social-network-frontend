// src/pages/ProfileEdit.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    gender: '',
    birth_date: '',
    profile_picture: '',
    cover_photo: '',
    bio: '',
    status: '',
    username: '',
    avatar: '',
    visibility_full_name: 'public',
    visibility_email: 'public',
    visibility_phone: 'public',
    visibility_gender: 'public',
    visibility_birth_date: 'public',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3001/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData(res.data.user);
      } catch (error) {
        console.error(error);
        setMessage('Không thể tải thông tin người dùng.');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.put('http://localhost:3001/api/users/update', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Cập nhật không thành công.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Cập nhật thông tin cá nhân</h2>
      {message && <div className="alert alert-info mt-3">{message}</div>}

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label>Tên đầy đủ</label>
          <input type="text" className="form-control" name="full_name" value={formData.full_name || ''} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" name="email" value={formData.email || ''} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Số điện thoại</label>
          <input type="text" className="form-control" name="phone" value={formData.phone || ''} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Giới tính</label>
          <select name="gender" className="form-control" value={formData.gender || ''} onChange={handleChange}>
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Ngày sinh</label>
          <input type="date" className="form-control" name="birth_date" value={formData.birth_date || ''} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Bio</label>
          <textarea className="form-control" name="bio" value={formData.bio || ''} onChange={handleChange}></textarea>
        </div>
        <div className="mb-3">
          <label>Tên người dùng</label>
          <input type="text" className="form-control" name="username" value={formData.username || ''} onChange={handleChange} />
        </div>

        <h5 className="mt-4">Cài đặt quyền riêng tư</h5>
        <div className="form-check form-switch">
          <input type="checkbox" className="form-check-input" name="visibility_email" checked={formData.visibility_email === 'public'} onChange={(e) => handleChange({ target: { name: 'visibility_email', value: e.target.checked ? 'public' : 'private' } })} />
          <label className="form-check-label">Hiển thị Email</label>
        </div>
        {/* Thêm các trường quyền riêng tư khác tương tự như trên */}

        <button type="submit" className="btn btn-primary mt-3">Cập nhật</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
