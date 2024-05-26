import { Document, model, PopulatedDoc, Schema } from "mongoose";
import { IUser } from "./userModel";
import { z } from "zod";

export type TCategory = {
  title: string;
  user_id: PopulatedDoc<IUser & Document>;
};

export const CategoryZodObject = z
  .object({
    title: z.string({
      required_error: "Title is required for creating new category!",
    }),
    new_title: z.string({
      required_error: "For update category, new_title field is required!",
    }),
  })
  .partial({ new_title: true });

export interface ICategory extends Document, TCategory {}

const CategorySchema = new Schema<ICategory>({
  title: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const categoryModel = model<ICategory>("Category", CategorySchema);

export default categoryModel;
