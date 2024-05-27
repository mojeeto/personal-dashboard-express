import { Document, PopulatedDoc, model, Schema } from "mongoose";
import { ICategory } from "./catergoryModel";
import { IContact } from "./contactModel";
import { z } from "zod";

/*
 * Wallet Model
 * title::string that represent to what you buy
 * price::the price of that thing
 * type::represent that money spended or income from someone
 * category_id::that point to which category you buy
 *            ::Like Food & Drink
 * contact_id::that point to from who or place you buy it
 * for::that point to for whos you buy that
 * */
export enum TWalletTypeRecord {
  expend = "EXPEND",
  income = "INCOME",
}

export type TWallet = {
  title: string;
  price: number;
  recordType: TWalletTypeRecord;
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
  recordType: z.enum(["EXPEND", "INCOME"], {
    required_error: "Record Type must be Expend or Income string.",
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
    recordType: {
      type: String,
      enum: TWalletTypeRecord,
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
