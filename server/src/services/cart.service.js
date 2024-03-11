const db = require("../config/db.config");
async function getCartByUserId(userId) {
    try {
        const [result] = await db.execute("select * from cart join products on cart.productId = products.productId join category on products.categoryId = category.categoryId where userId = ?", [userId])
        return result
    } catch (error) {
        console.log(error)
    }
}
async function checkProductInCart(productId, userId) {
    try {
        const [result] = await db.execute("select * from cart where productId = ? and userId = ?", [productId, userId])
        return result[0]
    } catch (error) {
        console.log(error)
    }
}
async function addNewProductToCart(newProduct, userId) {

    try {
        const [result] = await db.execute("insert into cart (userId, productId, quantity) values (?, ?, 1)", [userId, newProduct.productId])
        return result.insertId
    } catch (error) {
        console.log(error)
    }
}
async function updatePlusQuantity(productId, userId) {
    try {
        const [result] = await db.execute("update cart set quantity = quantity + 1 where productId = ? and userId = ?", [productId, userId])
        return result.insertId;
    } catch (error) {
        console.log(error)
    }
}
async function deleteCartSQL(id) {
    try {
        const [result] = await db.execute("delete from cart where cartId = ?", [
            id,
        ]);
        
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}
async function deleteAllCart(userId) {
    try {
        const [result] = await db.execute("delete from cart where userId = ?", [
            userId,
        ]);
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}
async function increSQL(id, type) {
    try {
        if (type == "incre") {
            const [result] = await db.execute(
                "update cart set quantity = quantity + 1 where cartId = ?",
                [id]
            );
            return result.insertId;
        } else {
            const [result] = await db.execute(
                "update cart set quantity = quantity - 1 where cartId = ?",
                [id]
            );
            return result.insertId;

        }

    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getCartByUserId,
    checkProductInCart,
    addNewProductToCart,
    updatePlusQuantity,
    deleteCartSQL,
    increSQL,
    deleteAllCart
}