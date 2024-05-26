import { Document, model, Schema, PopulatedDoc } from "mongoose";
import { IUser } from "./userModel";
import { z } from "zod";

export type TContact = {
  name: string;
  phoneNumber?: string;
  bankCartNumber?: string;
  user_id: PopulatedDoc<IUser & Document>;
};

export type ST_TContact = Omit<TContact, "user_id">;

export interface IContact extends Document, TContact {}

export const contactZodObject = z
  .object({
    name: z.string({
      required_error: "Name for contact is required!",
    }),
    phoneNumber: z
      .string()
      .trim()
      .length(10, "PhoneNumber format is not correct!"),
    bankCartNumber: z
      .string()
      .trim()
      .length(19, "Bank number format is not correct!"),
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
