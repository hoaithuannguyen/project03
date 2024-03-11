const db = require("../config/db.config");

async function createBillDetailMySql(billId, productId, quantity) {

    try {
        const [result] = await db.execute("insert into billdetail (bill_id, quantity, productId) values (?,?,?)", [billId, quantity, productId]);
        return result
    } catch (error) {
        console.log(error)
    }
}

async function getProductInBillMySql(billId) {
    try {
        const [result] = await db.execute(
            "SELECT * FROM bills join billdetail on bills.billsId = billdetail.bill_id join products on billdetail.productId = products.productId  where bills.billsId = ?",
            [billId]
        );
        return result
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createBillDetailMySql,
    getProductInBillMySql
}