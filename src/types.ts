import {SALES_TYPES, DATE_RANGES, PAYMENT_METHODS, TRANSACTION_STATUS} from "./constants"

export type SalesType = typeof SALES_TYPES[keyof typeof SALES_TYPES];
export type DateRange = typeof DATE_RANGES[keyof typeof DATE_RANGES];
export type PaymentMethod = typeof PAYMENT_METHODS[keyof typeof PAYMENT_METHODS];
export type TransactionStatus = typeof TRANSACTION_STATUS[keyof typeof TRANSACTION_STATUS];

export interface Transaction {
    amount: number;
    createdAt: number;
    deduction?: number;
    id: string;
    paymentMethod: PaymentMethod;
    salesType: string;
    status: TransactionStatus | string;
    transactionReference: number;
  }