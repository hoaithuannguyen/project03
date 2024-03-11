const { checkUserByEmail } = require("../services/users.service");
const jwt = require("jsonwebtoken");

// validate email mới ko đc trùng với các email đã có
const checkEmailExist = async (req, res, next) => {
    const { email } = req.body;
    const checkEmail = await checkUserByEmail(email);
    if (checkEmail) {
        return res.status(400).json({
            message: "Email da duoc dang ky",
        });
    }
    next();
};

// validate thông tin ko đc trống
async function checkEmpty(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Khong duoc de trong",
            });
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

// kiểm tra thông tin người dùng khi dùng tài nguyên hệ thống
const verifyToken = (req, res, next) => {
    try {
        // Lấy token
        // authorization: Bearer token
        // thông tin người dùng gửi lên
        const token = req.headers.authorization?.split(" ")[1];
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: "Không tìm thấy token" });
        }

        // chuyển token từ dạng mã hóa thành dạng thường có thể đọc được
        jwt.verify(token, "MABIMATJWT", (err, data) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    // Nếu token đã hết hạn
                    return res.status(401).json({ message: "Token đã hết hạn" });
                } else {
                    // Nếu token không hợp lệ
                    return res.status(403).json({ message: "Token không hợp lệ" });
                }
            }
            // Nếu token hop le
            if (data.role != 1) {
                return res
                    .status(403)
                    .json({ message: "Bạn không được cấp quyền để thực hiện việc này!" });
            }
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    checkEmailExist,
    checkEmpty,
    verifyToken,
};
