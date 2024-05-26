import contactModel, { ST_TContact } from "../models/contactModel";

export async function fetchAllContacts(userId: string) {
  return await contactModel.find({ user_id: userId }).exec();
}

export async function fetchContactById(id: string, userId: string) {
  return await contactModel.findOne({ id, user_id: userId }).exec();
}

export async function createContact(data: ST_TContact, userId: string) {
  const contact = new contactModel({ ...data, user_id: userId });
  return await contact.save();
}

export async function updateContact(
  contactId: string,
  newData: ST_TContact,
  userId: string,
) {
  return await contactModel
    .updateOne({ user_id: userId, id: contactId }, { ...newData })
    .exec();
}

export async function deleteContact(contactId: string, userId: string) {
  return await contactModel
    .deleteOne({ id: contactId, user_id: userId })
    .exec();
}
