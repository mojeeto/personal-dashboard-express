import categoryModel from "../models/catergoryModel";

export async function fetchAllCategories() {
  return await categoryModel.find().exec();
}
