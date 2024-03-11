const db = require("../config/db.config");

async function createBillMySql(userId, address, phone, total, name,) {
    try {
        const [result] = await db.execute("INSERT INTO bills (userId, address, phoneNumber, total, name, createdAt) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP())", [userId, address, phone, total, name]);
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}
async function getBillsMySql(userId) {
    try {
        const [result] = await db.execute("select * from bills join users on bills.userId = users.id where userId = ?", [userId]);
        return result
    } catch (error) {
        console.log(error)
    }
}
async function getBillByAdminSql() {
    try {
        const [result] = await db.execute("select *, bills.status as billStatus from bills join users on bills.userId = users.id");
        return result
    } catch (error) {
        console.log(error)
    }
}
async function updateStatus(billId, status) {
    console.log(billId, status);
    try {
        const [result] = await db.execute("update bills set status = ? where billsId = ? ", [status, billId])
        console.log(result);
        return result
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    createBillMySql,
    getBillsMySql,
    getBillByAdminSql,
    updateStatus
}