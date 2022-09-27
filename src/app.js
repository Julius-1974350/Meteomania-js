import PlanetsRoutes from "./routes/observations-routes.js";
import database from "../libs/database.js";
import express from "express";
import errors from "./middlewares/errors.js";
database();
const app = express();
app.use(express.json());
app.use('/observations', PlanetsRoutes);
app.use(errors);

export default app;