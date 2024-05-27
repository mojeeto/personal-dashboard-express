import walletModel, { TWallet, TWalletTypeRecord } from "../models/walletModel";

export async function fetchAllWalletRecords(userId: string) {
  return await walletModel.find({ user_id: userId }).exec();
}

export async function fetchWalletRecordById(userId: string, recordId: string) {
  return await walletModel.find({ user_id: userId, id: recordId }).exec();
}

export async function fetchAllExpendRecords(userId: string) {
  return await walletModel
    .find({ user_id: userId, recordType: TWalletTypeRecord.expend })
    .exec();
}

export async function fetchAllIncomeRecords(userId: string) {
  return await walletModel
    .find({ user_id: userId, recordType: TWalletTypeRecord.income })
    .exec();
}

export async function createNewWalletRecord(data: TWallet) {
  const newRecord = new walletModel(data);
  return await newRecord.save();
}

export async function updateWalletRecordById(recordId: string, data: TWallet) {
  return await walletModel.updateOne(
    { id: recordId, user_id: data.user_id },
    { data },
  );
}

export async function deleteWalletRecordById(recordId: string, userId: string) {
  return await walletModel.deleteOne({ id: recordId, user_id: userId });
}
