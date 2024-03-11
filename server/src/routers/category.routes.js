const { getCategories, addCate, deleteCate, updateCate } = require("../controllers/category.controllers");

const categoryRouter = (app) => {
    app.get("/api/v1/categories", getCategories);
    app.post("/api/v1/categories", addCate)
    app.delete("/api/v1/categories/:id", deleteCate)
    app.put("/api/v1/categories/:id", updateCate)
};

module.exports = {
    categoryRouter,
};
