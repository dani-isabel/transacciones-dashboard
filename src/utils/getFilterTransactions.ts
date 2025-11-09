import { Transaction } from "@/types";
import { DATE_RANGES } from "@/constants";
import type {DateRange, SalesType} from "@/types"

export function filterTransactionsByDateRange(
  transactions: Transaction[],
  dateRange: DateRange
): Transaction[] {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  let startDate: Date;

  switch (dateRange) {
    case DATE_RANGES.TODAY:
      startDate = startOfDay;
      break;
    case DATE_RANGES.WEEK:
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case DATE_RANGES.MONTH:
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    default:
      return transactions;
  }

  return transactions.filter(
    (transaction) => transaction.createdAt >= startDate.getTime()
  );
}

export function filterTransactionsBySalesType(
  transactions: Transaction[],
  salesTypes: SalesType[]
): Transaction[] {
  if (salesTypes.length === 0) {
    return transactions;
  }

  return transactions.filter((transaction) =>
    salesTypes.includes(transaction.salesType as SalesType)
  );
}

export function applyFilters(
  transactions: Transaction[],
  dateRange: DateRange,
  salesTypes: SalesType[]
): Transaction[] {
  let filtered = filterTransactionsByDateRange(transactions, dateRange);
  filtered = filterTransactionsBySalesType(filtered, salesTypes);
  return filtered;
}
