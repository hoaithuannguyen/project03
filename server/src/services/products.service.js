const db = require("../config/db.config");
async function getAllProductsMySQL() {
    try {
        const [products] = await db.execute("select * from products");
        return products;
    } catch (error) {
        console.log(error);
    }
}
async function addProductMySQL(newProduct) {
    const { nameProduct, price, image, stock, description, categoryId } =
        newProduct;
    try {
        const [result] = await db.execute(
            "insert into products (nameProduct,image,price,stock,description,categoryId) values (?,?,?,?,?,?)",
            [nameProduct, image, +price, +stock, description, +categoryId]
        );
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}
async function deleteProductMySql(id) {
    try {
        const [result] = await db.execute(
            "delete from products where productId = ?",
            [id]
        );
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}

async function updateProductMySQL(
    nameProduct,
    price,
    image,
    stock,
    description,
    categoryId,
    product_id
) {
    try {
        const [result] = await db.execute(
            "update products set nameProduct = ?, price = ?, image = ?, stock = ?, description = ?, categoryId = ? where productId = ?",
            [nameProduct, price, image, stock, description, categoryId, product_id]
        );
        console.log(result);
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}
async function getProductsByName(name) {
    try {
        const [products] = await db.execute(
            `select * from products where nameProduct like '%${name}%'`
        );
        return products;
    } catch (error) {
        console.log(error);
    }
}

async function getProductsByCategoryMySql(id) {
    try {
        if (id == 0) {
            const [products] = await db.execute(
                `select * from products`
            );
            return products;
        }
        const [products] = await db.execute(
            `select * from products where categoryId = ?`, [id]
        );
        return products;
    } catch (error) {
        console.log(error);
    }
}

async function updateStock(productId, quantity) {
    try {
        const [result] = await db.execute("update products set stock = stock - ? where productId = ?", [quantity, productId]);
        return result
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getAllProductsMySQL,
    addProductMySQL,
    deleteProductMySql,
    updateProductMySQL,
    getProductsByName,
    getProductsByCategoryMySql,
    updateStock
};
