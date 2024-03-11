const db = require("../config/db.config");
async function getCategoriesMySQL() {
    try {
        const [categories] = await db.execute("select * from category");
        return categories;
    } catch (error) {
        console.log(error);
    }
}
async function addCateSQL(nameCate) {
    try {
        const [cate] = await db.execute("insert into category (nameCategory) values (?)", [nameCate]);
        return cate.insertId
    } catch (error) {
        return null
    }
}

async function deleteCateSQL(cateId) {
    const [cate] = await db.execute("delete from category where categoryId = ?", [cateId]);
    return cate.insertId
}

async function updateCateSQL(nameCate, cateId) {
    const [cate] = await db.execute("update category set nameCategory = ? where categoryId = ?", [nameCate, cateId]);
    return cate.insertId
}


module.exports = { getCategoriesMySQL, addCateSQL, deleteCateSQL, updateCateSQL };
