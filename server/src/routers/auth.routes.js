const { register, login } = require("../controllers/auth.controllers");
const {
    checkEmailExist,
    checkEmpty,
} = require("../middlewares/verifyToken");

// định nghĩa làn auth
const authRouter = (app) => {
    //sign up có sử dụng các middleware đẻ validate trước khi đăng ký
    app.post("/api/auth/signup", checkEmpty, checkEmailExist, register);
    //login có sử dụng middlewarw để kiểm tra trước khi cho đăng nhập
    app.post("/api/auth/login", checkEmpty, login);
};

module.exports = authRouter;
