export type AIInsightInput = {
  balance: number;
  monthlySpend: number;
  monthlyIncome: number;
  savingsRate: number;
  cryptoBalance: number;
};

export type TransferFeeArgs = {
  amount: number;
  method?: "instant" | "smart" | "economy";
  currency?: string;
};

export function calculateTransferFee({ amount, method = "smart", currency = "USD" }: TransferFeeArgs) {
  const feeTable = {
    instant: 0.008,
    smart: 0.003,
    economy: 0.001,
  } as const;

  const ratio = feeTable[method] ?? feeTable.smart;
  return {
    currency,
    amount: Number(amount) * ratio,
    eta: method === "instant" ? "~10 sec" : method === "smart" ? "~1 min" : "~2-4 hrs",
  };
}
