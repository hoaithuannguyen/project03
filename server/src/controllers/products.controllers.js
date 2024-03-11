const {
    addProductMySQL,
    getAllProductsMySQL,
    deleteProductMySql,
    updateProductMySQL,
    getProductsByName,
    getProductsByCategoryMySql
} = require("../services/products.service");

async function getAllProducts(req, res) {
    try {
        const products = await getAllProductsMySQL();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
    }
}
async function addProduct(req, res) {
    try {
        const result = await addProductMySQL(req.body);
        if (!result) {
            return res.status(500).json({
                message: "Co loi khi them san pham",
            });
        }
        const products = await getAllProductsMySQL();
        res.status(200).json({
            message: "Them san pham thanh cong",
            products,
        });
    } catch (error) {
        console.log(error);
    }
}

async function deleteProduct(req, res) {
    const { id } = req.params;
    const result = await deleteProductMySql(id);
    const products = await getAllProductsMySQL();
    res.status(200).json({
        message: "Xoa san pham thanh cong",
        products,
    });
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { nameProduct, price, image, stock, description, categoryId } =
            req.body;
        const result = await updateProductMySQL(
            nameProduct,
            price,
            image,
            stock,
            description,
            categoryId,
            id
        );
        const products = await getAllProductsMySQL();
        res.status(200).json({
            message: "Sua san pham thanh cong",
            products,
        });
    } catch (error) {
        console.log(error);
    }
}
async function getProductsBySearch(req, res) {
    const { key } = req.query;
    try {
        const result = await getProductsByName(key);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}

async function getProductsByCategory(req, res) {
    const { id } = req.params;
    try {
        const result = await getProductsByCategoryMySql(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getAllProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    getProductsBySearch,
    getProductsByCategory
};
