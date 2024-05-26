import { Document, PopulatedDoc, model, Schema } from "mongoose";
import { ICategory } from "./catergoryModel";
import { IContact } from "./contactModel";
import { ZodIssueCode, z } from "zod";

/*
 * Wallet Model
 * title::string that represent to what you buy
 * price::the price of that thing
 * category_id::that point to which category you buy
 *            ::Like Food & Drink
 * contact_id::that point to from who or place you buy it
 * for::that point to for whos you buy that
 * */
export type TWallet = {
  title: string;
  price: number;
  category_id: PopulatedDoc<ICategory & Document>;
  contact_id: PopulatedDoc<IContact & Document>;
  forContacts: PopulatedDoc<IContact & Document>[];
};

export interface IWallet extends Document, TWallet {}

export const walletZodValidation = z.object({
  title: z.string({
    required_error: "Subject of which you buy is required!",
  }),
  price: z.number({
    required_error: "Price is required!",
  }),
  category_id: z.string({
    required_error: "Category is required!",
  }),
  contact_id: z.string({
    required_error: "Seller is required!",
  }),
  forContacts: z.array(
    z.string({
      required_error: "For who buy for ids is required!",
    }),
  ),
});

const WalletSchema = new Schema<IWallet>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    contact_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    forContacts: {
      type: [Schema.Types.ObjectId],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const walletModel = model<IWallet>("Wallet", WalletSchema);

export default walletModel;
