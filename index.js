const express = require("express");
// import express from "express"
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const adminRoutes = require("./routes/admin.routes");
const { rolesMiddleware } = require("./middlewares/roles.middleware");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/admin', rolesMiddleware("admin"), adminRoutes)

app.use('/user', userRoutes);

app.use('/product', productRoutes);


if (process.env.RENDER) {
  console.log("Using Node version for Render:", process.version);
} else {
  console.log("Using Node version for local development:", process.version);
}

app.listen(process.env.LISTEN_PORT, () => {
  console.log(`Server running on port: ${process.env.LISTEN_PORT}`);
});
