import React, { useEffect, useState } from 'react'
import "./Login.scss"
import { NavLink, useNavigate } from 'react-router-dom'
// import { failed, success } from '../../utils/noti';
import publicAxios from "../../config/publicAxios";
import { message } from "antd";

export default function Login() {
  // xử lý lên đầu trang
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  // tạo mắt mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  // lấy giá trị ô input

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleGetValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  //
  const navigate = useNavigate();
  // xử lý đăng nhập ,đưa lên API các thứ
  const handleLogin = async (e) => {
    e.preventDefault();
    // Xử lý đăng nhập
    try {
      const response = await publicAxios.post(
        "/api/auth/login",
        user
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userLogin", JSON.stringify(response.data.user));

      if (response.data.user.role == 0) {
        // localStorage.setItem("userLogin", JSON.stringify(response.data.user))
        // localStorage.setItem("token", response.data.token)
        message.info("Đăng nhập thành công!")
        setTimeout(() => {
          navigate("/")
        }, 2000);
      } else {
        // localStorage.setItem("adminLogin", JSON.stringify(response.data.user))
        // localStorage.setItem("adminToken", response.data.token)
        setTimeout(() => {
          navigate("/usersAdmin")
        }, 2000);
      }
    } catch (error) {
      // console.log(error);
      message.error(error.response.data.message);
    }
  };
  return (
    <div>
      <div className='body_login'>
        <div className='text_login'>ĐĂNG NHẬP TÀI KHOẢN</div>
        <div>
          <div className='personal_information'>Khách hàng đăng nhập</div>
          <div className='body_name'>
            <label htmlFor="input_email">Email *</label>
            <div>
              <input type="text"
                id='input_email'
                name="email"
                value={user.email}
                onChange={handleGetValue}
              />
            </div>
          </div>
          <div className='body_name'>
            <label htmlFor="input_password">Mật khẩu *</label>
            <div>
              <input
                id='input_password'
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={user.password}
                onChange={handleGetValue}
              />
              <span
                id="toggle-password"
                onClick={handleTogglePassword}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </span>
            </div>
          </div>
          <div className='body_button_register'>
            <div>Nếu chưa có tài khoản, click vào <NavLink to="/register" style={{ textDecoration: "none" }}>đây</NavLink> để đăng ký.</div>
          </div>
          <div className='body_button_register'>
            <button onClick={handleLogin}>Đăng nhập</button>
            <div className='body_button_register_home'><NavLink style={{ textDecoration: "none" }} to="/">Đi đến trang chủ</NavLink></div>
          </div>
        </div>
      </div>
    </div>
  )
}
