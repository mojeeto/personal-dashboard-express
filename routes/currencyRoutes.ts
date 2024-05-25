import { Router } from "express";
import {
  deleteCurreny,
  getCurrencies,
  getCurrency,
  postCurrency,
} from "../controllers/currencyController";
import { currencyValidation } from "../middlewares/validationMiddleware";

const currencyRouter = Router();

currencyRouter.get("/currencies", getCurrencies);
currencyRouter.post("/currency", getCurrency);
currencyRouter.post("/currency", currencyValidation, postCurrency);
currencyRouter.delete("currency", currencyValidation, deleteCurreny);

export default currencyRouter;
