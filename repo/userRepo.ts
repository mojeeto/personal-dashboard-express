import userModel, { IUser, TUser } from "../models/userModel";

export async function findUserByEmail(email: string): Promise<IUser | null> {
  return await userModel.findOne({ email }).exec();
}

export async function createUser(data: TUser): Promise<IUser> {
  // check email is exists or not
  const user = new userModel(data);
  return await user.save();
}
