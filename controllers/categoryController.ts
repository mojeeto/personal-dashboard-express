import { BaseMiddleware } from "../middlewares/intypes";
import { createCategory, fetchAllCategories } from "../repo/categoryRepo";
import { jsonRes } from "../utils/helper";

export const getCategories: BaseMiddleware = async (req, res, next) => {
  const categories = await fetchAllCategories();
  jsonRes(res, "Get All Categories", { data: categories });
};
export const postCategory: BaseMiddleware = async (req, res, next) => {
  const { title } = req.body;
  try {
    await createCategory(title, req.userId!);
    jsonRes(res, "Category created!");
  } catch (err) {
    jsonRes(res, "Something went wronge while create new category!");
  }
};
