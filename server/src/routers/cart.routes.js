const { addToCart, getCart, deleteCart, changeQuantity, deleteAllCartUser } = require("../controllers/cart.controller")

const cartRouter = (app) => {
    app.get("/api/v1/cart/:user_id", getCart)
    app.post("/api/v1/cart/:user_id", addToCart)
    app.delete("/api/v1/cart/:cartId", deleteCart)
    app.delete("/api/v1/carts/:userId", deleteAllCartUser)
    app.patch("/api/v1/cart", changeQuantity);
}

module.exports = {
    cartRouter
}