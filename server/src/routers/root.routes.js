const authRouter = require("./auth.routes");
const { userRouter } = require("./users.routes");
const { categoryRouter } = require("./category.routes");
const { productsRouter } = require("./products.routes");
const { cartRouter } = require("./cart.routes");
const { billRouter } = require("./bills.routes");
const { billDetailRouter } = require("./bills_detail.routes");

// định nghĩa rootRouter gồm 2 làn đường
const rootRouter = (app) => {
    authRouter(app),
    userRouter(app);
    productsRouter(app)
    categoryRouter(app)
    cartRouter(app)
    billRouter(app)
    billDetailRouter(app)
};

module.exports = rootRouter;
