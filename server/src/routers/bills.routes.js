const { createBill, getBills, getBillByAdmin, updateStatusBill } = require("../controllers/bills.controllers")

const billRouter = (app) => {
    app.post("/api/v1/bills", createBill)
    app.get("/api/v1/bills/:userId", getBills)
    app.get("/api/v1/bills", getBillByAdmin)
    app.put("/api/v1/bill/update/:billId", updateStatusBill)
}
module.exports = {
    billRouter
}