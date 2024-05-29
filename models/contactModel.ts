import { Document, model, Schema, PopulatedDoc } from "mongoose";
import { IUser } from "./userModel";
import { z } from "zod";

export type TContact = {
  id: string;
  name: string;
  phoneNumber?: string;
  bankCartNumber?: string;
  user_id: PopulatedDoc<IUser & Document>;
};

export type ST_TContact = Omit<TContact, "user_id" | "id">;

export interface IContact extends Document, Omit<TContact, "id"> {}

export const contactZodObject = z
  .object({
    name: z.string({
      required_error: "Name for contact is required!",
    }),
    phoneNumber: z
      .string()
      .trim()
      .length(11, "PhoneNumber format is not correct!"),
    bankCartNumber: z
      .string()
      .trim()
      .length(16, "Bank number length must be 16 character(s)."),
  })
  .partial({
    phoneNumber: true,
    bankCartNumber: true,
  });

const ContactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  phoneNumber: String,
  bankCartNumber: String,
});

const contactModel = model<IContact>("Contact", ContactSchema);

export default contactModel;
