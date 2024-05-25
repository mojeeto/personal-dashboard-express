import { BaseMiddleware } from "../middlewares/intypes";
import { fetchAllCategories } from "../repo/categoryRepo";
import { jsonRes } from "../utils/helper";

export const getCategories: BaseMiddleware = async (req, res, next) => {
  const categories = await fetchAllCategories();
  jsonRes(res, "Get All Categories", { data: categories });
};
export const postCategory: BaseMiddleware = (req, res, next) => {};
