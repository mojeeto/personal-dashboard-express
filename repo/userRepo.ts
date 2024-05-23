import userModel, { IUser, TUser } from "../models/userModel";

export async function findUserByEmail(email: string): Promise<IUser | null> {
  return await userModel.findOne({ email }).exec();
}

export async function createUser(data: TUser): Promise<IUser | null> {
  // check email is exists or not
  let user = await findUserByEmail(data.email);
  if (user) return null; // that means user is exists with that email
  user = new userModel(data);
  return await user.save();
}
