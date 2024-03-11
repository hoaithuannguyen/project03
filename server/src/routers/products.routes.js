const {
    addProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
    getProductsBySearch,
    getProductsByCategory
} = require("../controllers/products.controllers");

const productsRouter = (app) => {
    app.get("/api/v1/products", getAllProducts);
    app.post("/api/v1/products", addProduct);
    app.delete("/api/v1/deleteProduct/:id", deleteProduct);
    app.put("/api/v1/products/:id", updateProduct);
    app.get("/api/v1/products/search", getProductsBySearch);
    app.get("/api/v1/products/category/:id", getProductsByCategory);

};

module.exports = {
    productsRouter,
};
