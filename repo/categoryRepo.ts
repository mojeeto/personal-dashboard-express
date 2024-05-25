import categoryModel from "../models/catergoryModel";

export async function fetchAllCategories() {
  return await categoryModel.find().exec();
}

export async function createCategory(title: string, userId: string) {
  const category = new categoryModel({ title, user_id: userId });
  return await category.save();
}
