import React, { useEffect, useState } from "react";
import "./Register.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { failed, success } from "../../utils/noti";
import publicAxios from "../../config/publicAxios";
import { message } from "antd";

export default function Register() {
    // xử lý lên đầu trang
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    //tạo mắt
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    //
    // xử lý đăng ký
    // lấy giá trị ô input
    const [newUser, setNewUser] = useState({
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const handleGetValue = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };
    //hàm để chuyển router
    const navigate = useNavigate();
    // xử lý đăng ký ,đưa lên API các thứ
    const handleRegister = async (e) => {
        e.preventDefault();

        let err = 0
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(newUser.email)) {
            message.error("Ví dụ định dạng email: thuan@gmail.com!")
            err = 1
        }
        if (!/^(0|\+84)\d{9,10}$/.test(newUser.phone)) {
            message.error("Chưa đúng định dạng SĐT")
            err = 1
        }
        if (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(newUser.password)) {
            message.error("Chưa đúng định dạng mật khẩu")
            err = 1
        }
        if (newUser.confirmPassword != newUser.password) {
            message.error("Mật khẩu không khớp!")
            err = 1
        }

        if (err == 1) {
            return
        }

        try {
            const response = await publicAxios.post(
                "/api/auth/signup",
                newUser
            );
            console.log(response.data.message);
            if (response.data.message == "Dang ky thanh cong") {
                message.info("Đăng ký thành công!")
                setTimeout(() => {
                    navigate("/login")
                }, 2000);
            }
        } catch (error) {
            message.error(error.response.data.message);
        }
    };

    return (
        <div>
            <div className="body_register">
                <div className="text_register">ĐĂNG KÝ TÀI KHOẢN</div>
                <div>
                    <div className="personal_information">Thông tin cá nhân</div>
                    <div className="body_name">
                        <label htmlFor="input_email">Email *</label>
                        <div>
                            <input
                                type="text"
                                id="input_email"
                                onChange={handleGetValue}
                                name="email"
                                value={newUser.email}
                            />
                        </div>
                    </div>
                    <div className="body_name">
                        <label htmlFor="input_phone">Số điện thoại *</label>
                        <div>
                            <input
                                type="text"
                                id="input_phone"
                                onChange={handleGetValue}
                                name="phone"
                                value={newUser.phone}
                            />
                        </div>
                    </div>
                    <div className="body_name">
                        <label htmlFor="input_password">Mật khẩu *</label>
                        <div>
                            <input
                                id="input_password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={newUser.password}
                                onChange={handleGetValue}
                            />
                            <span className="toggle-password" onClick={handleTogglePassword}>
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                            </span>
                        </div>
                    </div>
                    <div className="body_name">
                        <label htmlFor="input_re_password">Nhập lại mật khẩu *</label>
                        <div>
                            <input
                                id="input_re_password"
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={newUser.confirmPassword}
                                onChange={handleGetValue}
                            />
                            <span className="toggle-password" onClick={handleTogglePassword}>
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                            </span>
                        </div>
                    </div>
                    <div className="body_button_register">
                        <div>
                            Nếu đã có tài khoản, click vào <NavLink style={{ textDecoration: "none" }} to="/login">đây</NavLink>{" "}
                            để đăng nhập.
                        </div>
                    </div>
                    <div className="body_button_register">
                        <button onClick={handleRegister}>Đăng ký</button>
                        <div className="body_button_register_home">
                            <NavLink style={{ textDecoration: "none" }} to="/">Đi đến trang chủ</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
