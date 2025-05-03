import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStrengthText, setPasswordStrengthText] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    evaluatePasswordStrength(value);
  };

  const evaluatePasswordStrength = (value) => {
    let strength = 0;

    if (value.length >= 8) strength += 1;
    if (/[A-Z]/.test(value)) strength += 1;
    if (/[a-z]/.test(value)) strength += 1;
    if (/[0-9]/.test(value)) strength += 1;
    if (/[\W]/.test(value)) strength += 1;

    setPasswordStrength(strength);

    if (strength <= 2) {
      setPasswordStrengthText('Yếu');
    } else if (strength <= 4) {
      setPasswordStrengthText('Trung bình');
    } else {
      setPasswordStrengthText('Mạnh');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = [];

    if (!fullName) validationErrors.push('Họ tên không được để trống.');
    if (!email) validationErrors.push('Email không được để trống.');
    if (!password) validationErrors.push('Mật khẩu không được để trống.');
    if (!confirmPassword) validationErrors.push('Vui lòng xác minh mật khẩu.');
    if (password !== confirmPassword) validationErrors.push('Mật khẩu và xác minh mật khẩu không khớp.');
    if (!birthDate) validationErrors.push('Ngày sinh không được để trống.');
    if (!gender) validationErrors.push('Vui lòng chọn giới tính.');
    if (passwordStrength < 4) {
      validationErrors.push('Mật khẩu chưa đủ mạnh. Hãy sử dụng ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setSuccessMessage('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/users/register', {
        fullName,
        email,
        password,
        birthDate,
        gender
      });

      setSuccessMessage(response.data.message || 'Đăng ký thành công!');
      setErrors([]);
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message || 'Đã xảy ra lỗi.']);
      } else {
        setErrors(['Lỗi hệ thống, vui lòng thử lại sau.']);
      }
      setSuccessMessage('');
    }
  };

  const getProgressBarColor = () => {
    if (passwordStrength <= 2) return 'bg-danger';
    if (passwordStrength <= 4) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Đăng Ký</h2>

        {errors.length > 0 && (
          <div className="alert alert-danger">
            <ul className="mb-0">
              {errors.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="text-center mt-3">
          <span>Bạn đã có tài khoản? </span>
          <a href="/login" className="text-decoration-none text-primary fw-bold">
            Đăng nhập tại đây
          </a>
        </div>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
          <label htmlFor="fullName" className="form-label fw-bold">Họ tên</label>
            <input
              type="text"
              className="form-control"
              placeholder="Họ tên"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          
          <div className="mb-3">
          <label htmlFor="fullName" className="form-label fw-bold">Gmail</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
          <label htmlFor="fullName" className="form-label fw-bold">Mật khẩu</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Mật khẩu"
                value={password}
                onChange={handlePasswordChange}
                title="Ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {password && (
              <>
                <div className="progress mt-2">
                  <div
                    className={`progress-bar ${getProgressBarColor()}`}
                    role="progressbar"
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                <small className="text-muted">{passwordStrengthText}</small>
              </>
            )}
          </div>

          <div className="mb-3">
          <label htmlFor="fullName" className="form-label fw-bold">Xác nhận mật khẩu</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              placeholder="Xác minh mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="fullName" className="form-label fw-bold">Ngày Sinh</label>
            <input
              type="date"
              className="form-control"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="fullName" className="form-label fw-bold">Giới Tính</label>
            <div>
              {['Nam', 'Nữ', 'Khác'].map((g, index) => (
                <div className="form-check form-check-inline" key={index}>
                  <input
                    type="radio"
                    className="form-check-input"
                    name="gender"
                    id={`gender-${g}`}
                    value={g}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor={`gender-${g}`}>{g}</label>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: '#1877f2', color: 'white' }}
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
