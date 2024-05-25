import { Router } from "express";
import { getCategories, postCategory } from "../controllers/categoryController";
import { CategoryValidation } from "../middlewares/validationMiddleware";

const categoryRouter = Router();

categoryRouter.get("/categories", getCategories);
categoryRouter.post("/category", CategoryValidation, postCategory);

export default categoryRouter;
