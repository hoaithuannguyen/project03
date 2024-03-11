const { getUsers, updateStatusUser } = require("../controllers/users.controllers");
const { verifyToken } = require("../middlewares/verifyToken");

const userRouter = (app) => {
    app.get("/api/users", verifyToken, getUsers);
    app.patch("/api/user/:id", updateStatusUser)
};
module.exports = {
    userRouter,
};
