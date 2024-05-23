import { model, Document, Schema } from "mongoose";
import { z } from "zod";

export interface IUser extends Document {
  forename: string;
  surname: string;
  email: string;
  password: string;
}

export const userModelValidation = z.object({
  forename: z.string({
    required_error: "Forename is required!",
  }),
  surname: z.string(),
  email: z
    .string({
      required_error: "Email is required!",
    })
    .email("Email is not correct!"),
  password: z.string({
    required_error: "Password is required!",
  }),
});

const UserSchema = new Schema<IUser>(
  {
    forename: {
      type: String,
      required: true,
    },
    surname: String,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const userModel = model<IUser>("users", UserSchema);

export default userModel;