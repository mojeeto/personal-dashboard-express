import currencyModel, { ICurrency } from "../models/currencyModel";

export async function fetchAllCurrencies() {
  return await currencyModel.find().exec();
}
export async function fetchCurrencyByCurrency(
  currency: string,
  userId: string,
): Promise<ICurrency | null> {
  return await currencyModel.findOne({ currency, user_id: userId }).exec();
}
export async function createCurrency(
  name: string,
  currency: string,
  userId: string,
) {
  const currencyInstance = new currencyModel({
    name,
    currency,
    user_id: userId,
  });
  return await currencyInstance.save();
}

export async function deleteSpecificCurrency(
  name: string,
  currency: string,
  userId: string,
) {
  return await currencyModel.deleteOne({ name, currency, user_id: userId });
}
