import { NextResponse } from "next/server";
import { generateWalletInsights } from "@/lib/ai";

export async function GET() {
  const summary = await generateWalletInsights();

  return NextResponse.json({ summary });
}
