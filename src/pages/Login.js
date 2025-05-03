import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/users/login', {
        email,
        password
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setSuccessMessage('Đăng nhập thành công!');
      setErrorMessage('');

      navigate(`/profile/${user.id}`);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Lỗi hệ thống, vui lòng thử lại sau.');
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-3">Đăng Nhập</h3>

        <div className="text-center mb-3">
          <span>Bạn chưa có tài khoản? </span>
          <a href="/register" className="text-decoration-none text-primary fw-bold">
            Đăng ký tại đây
          </a>
        </div>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mật khẩu</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
