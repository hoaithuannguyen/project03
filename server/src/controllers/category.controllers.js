const { getCategoriesMySQL, addCateSQL, deleteCateSQL, updateCateSQL } = require("../services/category.service");

async function getCategories(req, res) {
    try {
        const categories = await getCategoriesMySQL();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
    }
}
async function addCate(req, res) {
    try {
        const { nameCategory } = req.body
        const result = await addCateSQL(nameCategory)
        if (result == null) {
            return res.status(500).json({
                message: "Them category that bai",
            });
        }
        const cates = await getCategoriesMySQL();
        res.status(200).json({
            message: "Them category thanh cong",
            cates,
        });
    } catch (error) {
        console.log(error)
    }
}

async function deleteCate(req, res) {
    const { id } = req.params
    const result = await deleteCateSQL(id)
    const cates = await getCategoriesMySQL()
    res.status(200).json({
        message: "Xoa thanh cong",
        cates
    })
}

async function updateCate(req, res) {
    const { id } = req.params
    const { nameCategory } = req.body
    console.log("aaaaaaaaaaaaaaa", id, nameCategory);
    const result = await updateCateSQL(nameCategory, id)
    const cates = await getCategoriesMySQL()
    res.status(200).json({
        message: "Cap nhat thanh cong",
        cates
    })
}
module.exports = {
    getCategories, addCate, deleteCate, updateCate
};
