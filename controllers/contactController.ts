import { BaseMiddleware } from "../middlewares/intypes";
import {
  createContact,
  deleteContactById,
  fetchAllContacts,
  fetchContactById,
  updateContact,
} from "../repo/contactRepo";
import { jsonRes } from "../utils/helper";

export const getContacts: BaseMiddleware = async (req, res, _next) => {
  const contacts = await fetchAllContacts(req.userId!);
  jsonRes(res, "All Contacts", {
    data: contacts,
  });
};

export const getContact: BaseMiddleware = async (req, res, _next) => {
  const { id } = req.params;
  const contact = await fetchContactById(id, req.userId!);
  if (!contact) return jsonRes(res, "Contact not found!", { statusCode: 404 });
  jsonRes(res, "Contact Founded!", {
    data: contact,
  });
};

export const postContact: BaseMiddleware = async (req, res, _next) => {
  const { name, phoneNumber, bankCartNumber } = req.body;
  const contact = await createContact(
    { name, phoneNumber, bankCartNumber },
    req.userId!,
  );
  if (!contact)
    return jsonRes(res, "Contact creation failed!", { statusCode: 403 });
  jsonRes(res, "Contact created!", { statusCode: 201 });
};

export const patchContact: BaseMiddleware = async (req, res, _next) => {
  const { id } = req.params;
  const { name, phoneNumber, bankCartNumber } = req.body;
  const userId = req.userId!;
  // check is contact exists!
  const isContactExists = await fetchContactById(id, userId);
  if (!isContactExists)
    return jsonRes(res, "Contact not exists for updating!", {
      statusCode: 404,
    });
  const updatedContact = await updateContact(
    id,
    {
      name,
      phoneNumber,
      bankCartNumber,
    },
    userId,
  );
  jsonRes(res, "Contact updated!", { data: updatedContact });
};

export const deleteContact: BaseMiddleware = async (req, res, _next) => {
  const { id } = req.params;
  const userId = req.userId!;

  const isContactExists = await fetchContactById(id, userId);
  if (!isContactExists)
    return jsonRes(res, "Contact not found!", { statusCode: 404 });

  await deleteContactById(id, userId);
  jsonRes(res, "Contact deleted!");
};
