const { createBillDetail, getProductInBill } = require("../controllers/bills_detail.controller")

const billDetailRouter = (app) => {
    app.get("/api/v1/billDetail/:billId", getProductInBill)
    app.post("/api/v1/billDetail", createBillDetail)
}

module.exports = {
    billDetailRouter
}