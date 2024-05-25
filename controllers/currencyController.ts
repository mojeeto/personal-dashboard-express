import { BaseMiddleware } from "../middlewares/intypes";
import {
  createCurrency,
  deleteSpecificCurrency,
  fetchAllCurrencies,
  fetchCurrencyByCurrency,
} from "../repo/currencyRepo";
import { jsonRes } from "../utils/helper";

export const getCurrencies: BaseMiddleware = async (_req, res, _next) => {
  const currencies = await fetchAllCurrencies();
  jsonRes(res, "All Currencies", { data: currencies });
};

export const getCurrency: BaseMiddleware = async (req, res, _next) => {
  const { currency } = req.body;
  const findedCurrency = await fetchCurrencyByCurrency(currency, req.userId!);
  jsonRes(res, "", {
    data: {
      currency: findedCurrency,
    },
  });
};

export const postCurrency: BaseMiddleware = async (req, res, _next) => {
  const { name, currency } = req.body;
  try {
    const currencyFinded = await fetchCurrencyByCurrency(currency, req.userId!);
    if (currencyFinded)
      return jsonRes(res, "Currecy is exist!", { statusCode: 403 });
    await createCurrency(name, currency, req.userId!);
    jsonRes(res, "Currecy Created!", { statusCode: 201 });
  } catch (err) {
    jsonRes(res, "Something went wronge", { statusCode: 500 });
  }
};

export const deleteCurreny: BaseMiddleware = async (req, res, _next) => {
  const { name, currency } = req.body;
  try {
    const currencyFinded = await fetchCurrencyByCurrency(currency, req.userId!);
    if (!currencyFinded)
      return jsonRes(res, "Currency not founded!", { statusCode: 404 });
    await deleteSpecificCurrency(name, currency, req.userId!);
    jsonRes(res, "Currency Deleted");
  } catch (err) {
    jsonRes(res, "Something went wronge", {
      statusCode: 500,
    });
  }
};
