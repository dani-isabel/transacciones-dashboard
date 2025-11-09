export const SALES_TYPES = {
  TERMINAL: "TERMINAL",
  PAYMENT_LINK: "PAYMENT_LINK",
} as const;

export const DATE_RANGES = {
  TODAY: "today",
  WEEK: "week",
  MONTH: "month",
} as const;

export const URL_PARAMS = {
  DATE_RANGE: "dateRange",
  SALES_TYPE: "salesType",
} as const;

export const PAYMENT_METHODS = {
  CARD: "CARD",
  DAVIPLATA: "DAVIPLATA",
  NEQUI: "NEQUI",
  PSE: "PSE",
  BANCOLOMBIA: "BANCOLOMBIA",
} as const;

export const TRANSACTION_STATUS = {
  SUCCESSFUL: "SUCCESSFUL",
  REJECTED: "REJECTED",
} as const;
