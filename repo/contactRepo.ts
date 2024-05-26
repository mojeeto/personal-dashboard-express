import contactModel, { ST_TContact } from "../models/contactModel";

export async function fetchAllContacts() {
  return await contactModel.find().exec();
}

export async function fetchContactById(id: string) {
  return await contactModel.findOne({ id }).exec();
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

export async function deleteContact(contactId: string) {
  return await contactModel.deleteOne({ id: contactId }).exec();
}
