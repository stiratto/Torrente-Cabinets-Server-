import express from "express"
import cors from "cors"
import morgan from "morgan"
import userRoutes from "./routes/user.routes.js"
import productRoutes from "./routes/product.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import { rolesMiddleware } from "./middlewares/roles.middleware.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/admin', rolesMiddleware("admin"), adminRoutes)

app.use('/user', userRoutes);

app.use('/product', productRoutes);

app.listen(process.env.LISTEN_PORT, () => {
  console.log(`Server running on port: ${process.env.LISTEN_PORT}`);
});
