const express = require("express");
require("./src/config/db.config");

// tạo ứng dụng
const app = express();
//
require("dotenv").config();

// dùng cors để front-end kết nối đến
const cors = require("cors");
// import hệ thống phân chia đường dẫn
const rootRouter = require("./src/routers/root.routes");
// dùng body parser để nhận dữ liệu dưới dạng json()
const bodyParser = require("body-parser");

// Set up
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// sử dụng hệ thống phân chia router
rootRouter(app);

// chạy app
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
