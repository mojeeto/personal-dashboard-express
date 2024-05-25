import { BaseMiddleware } from "../middlewares/intypes";
import {
  createCategory,
  deleteCategoryByTitle,
  fetchAllCategories,
  fetchCategoryByTitle,
  updateCategoryByTitle,
} from "../repo/categoryRepo";
import { jsonRes } from "../utils/helper";

export const getCategories: BaseMiddleware = async (_req, res, _next) => {
  const categories = await fetchAllCategories();
  jsonRes(res, "Get All Categories", { data: categories });
};

export const postCategory: BaseMiddleware = async (req, res, _next) => {
  const { title } = req.body;
  try {
    const category = await fetchCategoryByTitle(title, req.userId!);
    if (category)
      return jsonRes(res, "Category with this title is exists!", {
        statusCode: 403,
      });
    await createCategory(title, req.userId!);
    jsonRes(res, "Category created!", {
      statusCode: 201,
    });
  } catch (err) {
    jsonRes(res, "Something went wronge while create new category!");
  }
};

export const patchCategory: BaseMiddleware = async (req, res, _next) => {
  const { title, new_title } = req.body;
  try {
    const category = await fetchCategoryByTitle(title, req.userId!);
    if (!category)
      return jsonRes(res, "Category is not exists!", { statusCode: 403 });
    await updateCategoryByTitle(title, req.userId!, new_title);
    return jsonRes(res, "Category is updated!");
  } catch (err) {
    jsonRes(res, "Something went wronge while update category!");
  }
};

export const deleteCategory: BaseMiddleware = async (req, res, _next) => {
  const { title } = req.body;
  try {
    const category = await fetchCategoryByTitle(title, req.userId!);
    if (!category)
      return jsonRes(res, "Category is not exists!", { statusCode: 403 });
    await deleteCategoryByTitle(title, req.userId!);
    jsonRes(res, "Category deleted!");
  } catch (err) {
    jsonRes(res, "Something went wronge while delete a category!");
  }
};
