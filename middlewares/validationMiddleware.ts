import { ZodError, ZodIssueCode, z } from "zod";
import {
  isAuthenticatedZodObject,
  userAuthZodObject,
  userResgierZodObject,
} from "../models/userModel";
import { BaseMiddleware } from "./intypes";
import { jsonRes, isJWTValid } from "../utils/helper";
import { CategoryZodObject } from "../models/catergoryModel";
import { CurrencyZodObject } from "../models/currencyModel";
import { contactZodObject } from "../models/contactModel";
import { walletZodValidation } from "../models/walletModel";
import { fetchCategoryById } from "../repo/categoryRepo";
import { fetchContactById } from "../repo/contactRepo";

export type ValidationErrorType = {
  field_name: string;
  message: string;
};

function ZodErrorHandler(zError: ZodError): ValidationErrorType[] {
  const findedError: ValidationErrorType[] = [];

  zError.errors.map((zodIssue) => {
    const fieldName = zodIssue.path[0].toString();
    const message = zodIssue.message;
    findedError.push({
      field_name: fieldName,
      message,
    });
  });

  return findedError;
}

export const LoginValidation: BaseMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await userAuthZodObject.parseAsync({ email, password });
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = ZodErrorHandler(error);
      return jsonRes(res, "Validation Error", {
        statusCode: 403,
        validationData: validationError,
      });
    }
    return jsonRes(res, "Something went wronge!", {
      statusCode: 500,
    });
  }
};

export const ResgierValidation: BaseMiddleware = async (req, res, next) => {
  try {
    const { forename, surname, email, password } = req.body;
    await userResgierZodObject.parseAsync({
      forename,
      surname,
      email,
      password,
    });
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = ZodErrorHandler(error);
      return jsonRes(res, "Validation Error", {
        statusCode: 403,
        validationData: validationError,
      });
    }
    return jsonRes(res, "Something went wronge!", {
      statusCode: 500,
    });
  }
};

export const isAuthenticated: BaseMiddleware = async (req, res, next) => {
  try {
    const { jwt_token } = req.body;
    await isAuthenticatedZodObject.parseAsync({ jwt_token });
    // check jwt_token is valid or not
    const user = await isJWTValid(jwt_token);
    if (!user)
      return jsonRes(res, "JWT token is not valid, Please login first!");
    req.userId = user.id;
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = ZodErrorHandler(error);
      return jsonRes(res, "Validation Error", {
        statusCode: 403,
        validationData: validationError,
      });
    }
    return jsonRes(res, "Something went wronge!", {
      statusCode: 500,
    });
  }
};

export const CategoryValidation: BaseMiddleware = async (req, res, next) => {
  try {
    const { title, new_title } = req.body;
    const method = req.method.toLowerCase();
    if (["post", "delete"].includes(method)) {
      await CategoryZodObject.parseAsync({
        title,
      });
    } else if (method === "patch") {
      await CategoryZodObject.required({ new_title: true }).parseAsync({
        title,
        new_title,
      });
    } else {
      return jsonRes(res, "Bad method!", { statusCode: 404 });
    }
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = ZodErrorHandler(error);
      return jsonRes(res, "Validation Error", {
        statusCode: 403,
        validationData: validationError,
      });
    }
    return jsonRes(res, "Something went wronge!", {
      statusCode: 500,
    });
  }
};

export const currencyValidation: BaseMiddleware = async (req, res, next) => {
  try {
    const { name, currency } = req.body;
    const method = req.method.toLowerCase();
    if (["post", "delete"].includes(method)) {
      await CurrencyZodObject.required({ name: true }).parseAsync({
        name,
        currency,
      });
      return next();
    } else if (method === "get") {
      await CurrencyZodObject.parseAsync({ name, currency });
      return next();
    }
    return jsonRes(res, "Bad Method!", {
      statusCode: 403,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = ZodErrorHandler(error);
      return jsonRes(res, "Validation Error", {
        statusCode: 403,
        validationData: validationError,
      });
    }
    return jsonRes(res, "Something went wronge!", {
      statusCode: 500,
    });
  }
};

export const IdParamValidation: BaseMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    await z
      .object({
        id: z
          .string({
            required_error: "Id is required for this path!",
          })
          .trim(),
      })
      .parseAsync({ id });
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = ZodErrorHandler(error);
      return jsonRes(res, "Validation Error", {
        statusCode: 403,
        validationData: validationError,
      });
    }
    return jsonRes(res, "Something went wronge!", {
      statusCode: 500,
    });
  }
};

export const ContactValidation: BaseMiddleware = async (req, res, next) => {
  try {
    const { name, phoneNumber, bankCartNumber } = req.body;
    const method = req.method.toLowerCase();
    if (["post", "patch"].includes(method)) {
      await contactZodObject.parseAsync({
        name,
        phoneNumber,
        bankCartNumber,
      });
      return next();
    }
    return jsonRes(res, "Bad Method!", {
      statusCode: 403,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = ZodErrorHandler(error);
      return jsonRes(res, "Validation Error", {
        statusCode: 403,
        validationData: validationError,
      });
    }
    return jsonRes(res, "Something went wronge!", {
      statusCode: 500,
    });
  }
};

export const WalletValidation: BaseMiddleware = async (req, res, next) => {
  try {
    const { name, price, category_id, contact_id, forContacts } = req.body;
    await walletZodValidation
      .superRefine(async (args, ctx) => {
        const { price, category_id, contact_id, forContacts } = args;
        const userId = req.userId!;
        if (isNaN(price))
          ctx.addIssue({
            code: ZodIssueCode.custom,
            message: "Price is not number!",
          });
        const category = await fetchCategoryById(category_id, userId);
        if (!category)
          ctx.addIssue({
            code: ZodIssueCode.custom,
            message: "Category is not exists!",
          });
        const contact = await fetchContactById(contact_id, userId);
        if (!contact)
          ctx.addIssue({
            code: ZodIssueCode.custom,
            message: "Contact is not exists!",
          });
        if (forContacts.length === 0) {
          ctx.ZodIssueCode({
            code: ZodIssueCode.custom,
            message: "Contact for is required!",
          });
        }
        if (forContacts.length !== new Set(forContacts).size) {
          ctx.addIssue({
            code: ZodIssueCode.custom,
            message: "Duplicate Contacts in ForContacts is not allowed!",
          });
        }
        forContacts.map(async (contactId) => {
          const fetchContact = await fetchContactById(contactId);
          if (!fetchContact) {
            ctx.addIssue({
              code: ZodIssueCode.custom,
              message: `Contact with ID{${contactId}} is not exists!`,
            });
          }
        });
      })
      .parseAsync({
        name,
        price,
        category_id,
        contact_id,
        forContacts,
      });
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = ZodErrorHandler(error);
      return jsonRes(res, "Validation Error", {
        statusCode: 403,
        validationData: validationError,
      });
    }
    return jsonRes(res, "Something went wronge!", {
      statusCode: 500,
    });
  }
};
