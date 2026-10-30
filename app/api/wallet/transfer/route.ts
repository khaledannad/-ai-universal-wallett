import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { amount = 250, currency = "USD", method = "smart" } = body;

  const feeTable: Record<string, number> = {
    instant: 0.008,
    smart: 0.003,
    economy: 0.001,
  };

  const multiplier = feeTable[method] ?? feeTable.smart;
  const fee = Number(amount) * multiplier;

  return NextResponse.json({
    amount,
    currency,
    method,
    fee,
    eta: method === "instant" ? "~10 sec" : method === "smart" ? "~1 min" : "~2-4 hrs",
  });
}
