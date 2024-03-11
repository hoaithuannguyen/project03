const { addNewProductToCart, checkProductInCart, updatePlusQuantity, getCartByUserId, increSQL, deleteCartSQL, deleteAllCart } = require("../services/cart.service");
async function getCart(req, res) {
    const { user_id } = req.params
    try {
        const cart = await getCartByUserId(user_id)
        res.status(200).json(cart)
    } catch (error) {
        console.log(error)
    }
}
async function addToCart(req, res) {

    try {
        //Check xem sản phẩm đã có trong giỏ hàng hay chưa
        const check = await checkProductInCart(req.body.productId, req.params.user_id);
        if (!check) {
            // Nếu chưa có trong giỏ hàng thì thêm vào
            await addNewProductToCart(req.body, req.params.user_id);
            return res.status(201).json({
                message: "Them gio hang thanh cong"
            })
        }
        // Nếu đã có trong giỏ hàng thì tăng số lượng
        await updatePlusQuantity(req.body.productId, req.params.user_id);
        res.status(200).json({
            message: "Cap nhap so luong thanh cong"
        })
    } catch (error) {
        console.log(error)
    }
}

async function deleteCart(req, res) {
    const { cartId } = req.params;
    try {
        const result = await deleteCartSQL(cartId);
        res.status(200).json({
            message: "Xóa sản phẩm thành công",
        });
    } catch (error) {
        console.log(error);
    }
}
async function deleteAllCartUser(req, res) {
    const { userId } = req.params;
    console.log("delete All Cart", userId)
    try {
        const result = await deleteAllCart(userId);
        res.status(200).json({
            message: "Xóa sản phẩm thành công",
        });
    } catch (error) {
        console.log(error);
    }
}
async function changeQuantity(req, res) {
    // console.log("33333", req.body)
    const { cartId, type } = req.body;
    try {
        const result = await increSQL(cartId, type);
        res.status(200).json({
            message: "tăng số lượng thành công",
        });
    } catch (error) {
        console.log(error);

    }
}

module.exports = {
    getCart,
    addToCart,
    deleteCart,
    changeQuantity,
    deleteAllCartUser
}