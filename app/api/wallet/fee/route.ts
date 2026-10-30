import { NextResponse } from "next/server";
import { calculateTransferFee } from "@/lib/wallet";

export async function POST(request: Request) {
  const body = await request.json();
  const { amount = 250, method = "smart", currency = "USD" } = body;

  const fee = calculateTransferFee({ amount, method, currency });

  return NextResponse.json({
    amount,
    currency,
    method,
    fee: fee.amount,
    eta: fee.eta,
  });
}
