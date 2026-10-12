export interface TransactionRecord {
  tran_id: string;
  amount: string;
  currency: string;
  status: string;
  sessionkey?: string;
  gatewayPageUrl?: string;
  val_id?: string;
  bank_tran_id?: string;
  card_type?: string;
  ipnPayload?: Record<string, string>;
  validation?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

const transactions = new Map<string, TransactionRecord>();

export const transactionStore = {
  upsert(record: TransactionRecord): TransactionRecord {
    transactions.set(record.tran_id, record);
    return record;
  },
  get(tranId: string): TransactionRecord | undefined {
    return transactions.get(tranId);
  },
  all(): TransactionRecord[] {
    return Array.from(transactions.values());
  },
};
