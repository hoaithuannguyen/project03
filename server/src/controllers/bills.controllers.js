const { createBillMySql, getBillsMySql, getBillByAdminSql, updateStatus } = require("../services/bills.service");

async function createBill(req, res) {

    const { userId, address, phone, total, name } = req.body
    try {
        const newIdBill = await createBillMySql(userId, address, phone, total, name)
        res.status(201).json({
            newIdBill
        })
    } catch (error) {
        console.log(error)
    }
}

async function getBills(req, res) {
    const { userId } = req.params
    try {
        const bills = await getBillsMySql(userId)
        res.status(200).json({
            bills
        })
    } catch (error) {
        console.log(error)
    }
}
async function getBillByAdmin(req, res) {
    try {
        const bills = await getBillByAdminSql()
        res.status(200).json({
            bills
        })
    } catch (error) {
        console.log(error)
    }
}
async function updateStatusBill(req, res) {

    const { billId } = req.params
    const { status } = req.body
    try {
        await updateStatus(billId, status)
        res.status(200).json({
            message: "Update thanh cong"
        })
    } catch (error) {
        console.log(first)
    }

}
module.exports = {
    createBill,
    getBills,
    getBillByAdmin,
    updateStatusBill
}