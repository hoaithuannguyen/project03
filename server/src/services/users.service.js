const db = require("../config/db.config");

async function getAllUsers() {
    try {
        const [user] = await db.execute("select * from users");
        return user;
    } catch (error) {
        console.log(error);
    }
}

async function checkUserByEmail(email) {
    try {
        const [findUser] = await db.execute("select * from users where email = ?", [
            email,
        ]);
        return findUser[0];
    } catch (error) {
        console.log(error);
    }
}
async function addUser(phone, password, email) {
    try {
        const [result] = await db.execute(
            "insert into users (phone, password, email) values (?, ?, ?)",
            [phone, password, email]
        );
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}
async function getUserById(id) {
    try {
        const [findUser] = await db.execute("select * from users where id = ?", [
            id,
        ]);
        return findUser[0];
    } catch (error) {
        console.log(error);
    }
}
async function updateStatus(id, status) {
    try {
        const [result] = await db.execute("update users set status = ? where id = ?", [status, id])
        return result.insertId;
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getAllUsers,
    addUser,
    checkUserByEmail,
    updateStatus,
    getUserById
};
