import { Router } from "express";
import {
  deleteContact,
  getContact,
  patchContact,
  postContact,
} from "../controllers/contactController";
import {
  ContactValidation,
  IdParamValidation,
} from "../middlewares/validationMiddleware";

const contactRouter = Router();

contactRouter.get("/contacts", getContact);
contactRouter.get("/contact/:id", IdParamValidation, getContact);
contactRouter.post("/contact", ContactValidation, postContact);
contactRouter.patch(
  "/contact/:id",
  IdParamValidation,
  ContactValidation,
  patchContact,
);
contactRouter.delete("/contact/:id", IdParamValidation, deleteContact);

export default contactRouter;
