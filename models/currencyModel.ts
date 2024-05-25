import { Document, model, Schema, PopulatedDoc } from "mongoose";
import { IUser } from "./userModel";
import { z } from "zod";

export type TCurrency = {
  name: string;
  currency: string;
  user_id: PopulatedDoc<IUser & Document>;
};

export interface ICurrency extends Document, TCurrency {}

export const CurrencyZodObject = z
  .object({
    name: z.string({
      required_error: "Name for currency is required! Like (IRAN Currency)",
    }),
    currency: z.string({
      required_error: "Currency word is required! Like (IRR for iran)",
    }),
  })
  .partial({
    name: true,
  });

const CurrencySchema = new Schema<ICurrency>({
  name: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const currencyModel = model<ICurrency>("Currency", CurrencySchema);

export default currencyModel;
