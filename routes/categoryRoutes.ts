import { Router } from "express";
import {
  deleteCategory,
  getCategories,
  patchCategory,
  postCategory,
} from "../controllers/categoryController";
import { CategoryValidation } from "../middlewares/validationMiddleware";

const categoryRouter = Router();

categoryRouter.get("/categories", getCategories);
categoryRouter.post("/category", CategoryValidation, postCategory);
categoryRouter.patch("/category", CategoryValidation, patchCategory);
categoryRouter.delete("/category", CategoryValidation, deleteCategory);

export default categoryRouter;
