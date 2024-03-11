const { getAllUsers, updateStatus, getUserById } = require("../services/users.service");

async function getUsers(req, res) {
    const users = await getAllUsers();
    res.status(200).json({
        users,
        message: "Ban la admin",
    });
}
async function updateStatusUser(req, res) {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        const newStatus = !user.status;
        const updateUser = await updateStatus(id, newStatus);
        const users = await getAllUsers();
        res.status(200).json({
            message: "Update thanh cong",
            users
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getUsers,
    updateStatusUser
};
