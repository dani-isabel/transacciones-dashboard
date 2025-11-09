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

export type SalesType = typeof SALES_TYPES[keyof typeof SALES_TYPES];
export type DateRange = typeof DATE_RANGES[keyof typeof DATE_RANGES];
