require("dotenv").config();
const cors = require("cors");
const express = require("express");
const loginRouter = require("./modules/login/login.router");
const productsRouter = require("./modules/products/products.router");
const categoriesRouter = require("./modules/categories/categories.router");
const technologiesRouter = require("./modules/technologies/technologies.router");
const customersRouter = require("./modules/customers/customers.router");
const addressesRouter = require("./modules/addresses/addresses.router");
const ordersRouter = require("./modules/orders/orders.router");
const authCheck = require("./middleware/authCheck");
const port = process.env.PORT ?? 8080;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(authCheck);
app.disable("x-powered-by");

// Routers
app.use("/login", loginRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/technologies", technologiesRouter);
app.use("/addresses", addressesRouter);
app.use("/customers", customersRouter);
app.use("/addresses", addressesRouter);
app.use("/orders", ordersRouter);

// Spinning up server
app.listen(port, () => console.info(`Listening on ${port}...`));
