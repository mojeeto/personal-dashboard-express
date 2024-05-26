import { Document, PopulatedDoc, model, Schema } from "mongoose";
import { ICategory } from "./catergoryModel";
import { IContact } from "./contactModel";
import { z } from "zod";

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
  for: PopulatedDoc<IContact & Document>[];
};

export interface IWallet extends Document, TWallet {}

const walletZodValidation = z
  .object({
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
    for: z.array(
      z.string({
        required_error: "For who buy for ids is required!",
      }),
    ),
  })
  .superRefine(async (args, ctx) => {
    // check price is valid
    // check category_id is exists
    // check contact_id is exists
    // check length of For contactsList
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
    for: {
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
