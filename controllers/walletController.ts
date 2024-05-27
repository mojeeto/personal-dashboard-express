import { BaseMiddleware } from "../middlewares/intypes";
import {
  createNewWalletRecord,
  deleteWalletRecordById,
  fetchAllWalletRecords,
  fetchWalletRecordById,
  updateWalletRecordById,
} from "../repo/walletRepo";
import { jsonRes } from "../utils/helper";

export const getWalletRecords: BaseMiddleware = async (req, res, _next) => {
  const userId = req.userId!;
  const wallet = await fetchAllWalletRecords(userId);
  jsonRes(res, "Wallet Records", {
    data: wallet,
  });
};

export const getWalletRecord: BaseMiddleware = async (req, res, _next) => {
  const userId = req.userId!;
  const { id: recordId } = req.params;
  const record = await fetchWalletRecordById(userId, recordId);
  if (!record) return jsonRes(res, "Record not exists with this id.");
  jsonRes(res, "Record finded", {
    data: record,
  });
};

export const postWalletRecord: BaseMiddleware = async (req, res, _next) => {
  const userId = req.userId!;
  const { title, price, recordType, category_id, contact_id, forContacts } =
    req.body;
  const newRecord = await createNewWalletRecord(
    {
      title,
      price,
      recordType,
      category_id,
      contact_id,
      forContacts,
    },
    userId,
  );
  if (!newRecord)
    return jsonRes(res, "Record not added, something went wrong", {
      statusCode: 403,
    });
  jsonRes(res, "Record Created!", {
    statusCode: 201,
  });
};

export const patchWalletRecord: BaseMiddleware = async (req, res, _next) => {
  const userId = req.userId!;
  const { id: recordId } = req.params;
  const { title, price, recordType, category_id, contact_id, forContacts } =
    req.body;
  const updatedRecord = await updateWalletRecordById(
    recordId,
    {
      title,
      price,
      recordType,
      category_id,
      contact_id,
      forContacts,
    },
    userId,
  );
  jsonRes(res, "Record updated!");
};

export const deleteWalletRecord: BaseMiddleware = async (req, res, _next) => {
  const userId = req.userId!;
  const { id: recordId } = req.params;
  await deleteWalletRecordById(recordId, userId);
  jsonRes(res, "Record deleted!");
};
