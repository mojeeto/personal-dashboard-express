import categoryModel from "../models/catergoryModel";

export async function fetchAllCategories() {
  return await categoryModel.find().exec();
}

export async function fetchCategoryByTitle(title: string, userId: string) {
  return await categoryModel.findOne({ title, user_id: userId }).exec();
}

export async function createCategory(title: string, userId: string) {
  const category = new categoryModel({ title, user_id: userId });
  return await category.save();
}

export async function updateCategoryByTitle(
  title: string,
  userId: string,
  newTitle: string,
) {
  return await categoryModel.updateOne(
    { title, user_id: userId },
    { title: newTitle },
  );
}

export async function deleteCategoryByTitle(title: string, userId: string) {
  return await categoryModel.deleteOne({ title, user_id: userId });
}
