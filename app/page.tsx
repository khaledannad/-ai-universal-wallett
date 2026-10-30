"use client";

import { useEffect, useState } from "react";

const wallet = {
  balance: 24380.5,
  monthlyIncome: 8600,
  monthlySpend: 4250,
  savingsRate: 42,
  cryptoBalance: 2.84,
  activeCards: 3,
};

const quickStats = [
  { label: "Total balance", value: "$24,380.50", tone: "cyan" },
  { label: "Monthly income", value: "$8,600", tone: "emerald" },
  { label: "Monthly spend", value: "$4,250", tone: "amber" },
  { label: "Savings rate", value: "42%", tone: "violet" },
];

const recentActivity = [
  { title: "Salary deposit", detail: "Today • 2:18 PM", amount: "+$3,200.00" },
  { title: "Groceries", detail: "Yesterday • 7:40 PM", amount: "-$340.50" },
  { title: "BTC purchase", detail: "Mon • 10:05 AM", amount: "-$480.00" },
  { title: "Freelance payment", detail: "Sun • 9:30 AM", amount: "+$1,180.00" },
];

const transferFeeModes = [
  { label: "Instant", fee: 0.8, eta: "~10 sec" },
  { label: "Smart", fee: 0.3, eta: "~1 min" },
  { label: "Economy", fee: 0.1, eta: "~2-4 hrs" },
];

export default function Home() {
  const [aiInsight, setAiInsight] = useState<string>("Analyzing account behavior...");
  const [feeQuote, setFeeQuote] = useState<string>("Calculating transfer fee...");

  useEffect(() => {
    const fetchInsight = async () => {
      try {
        const res = await fetch("/api/ai/insights");
        const data = await res.json();
        setAiInsight(data.summary || "Your wallet is currently healthy and predictable.");
      } catch {
        setAiInsight("Your wallet looks healthy. Keep investing in your savings target and avoid impulse spending.");
      }
    };

    const fetchFee = async () => {
      try {
        const res = await fetch("/api/wallet/fee", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 250, method: "smart" }),
        });
        const data = await res.json();
        setFeeQuote(`${data.currency} ${data.fee.toFixed(2)} fee • ${data.eta}`);
      } catch {
        setFeeQuote("USD 0.30 fee • ~1 min");
      }
    };

    fetchInsight();
    fetchFee();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">AI Universal Wallet</p>
            <h1 className="mt-2 text-4xl font-black">Finance intelligence, built for everyone</h1>
          </div>
          <button className="rounded-full bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
            + New wallet
          </button>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          {quickStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-soft">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-3 text-3xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">AI wallet overview</h2>
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                healthy
              </span>
            </div>
            <p className="mt-5 text-slate-300">{aiInsight}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Cash flow</p>
                <p className="mt-2 text-2xl font-bold text-emerald-400">+$4,350</p>
              </div>
              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Crypto</p>
                <p className="mt-2 text-2xl font-bold text-cyan-400">{wallet.cryptoBalance} BTC</p>
              </div>
              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Active cards</p>
                <p className="mt-2 text-2xl font-bold text-violet-400">{wallet.activeCards}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-500/30 bg-cyan-500/5 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Smart transfer fee</p>
            <h3 className="mt-4 text-3xl font-bold">{feeQuote}</h3>
            <div className="mt-6 space-y-3">
              {transferFeeModes.map((mode) => (
                <div key={mode.label} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-3">
                  <div>
                    <p className="font-semibold">{mode.label}</p>
                    <p className="text-sm text-slate-400">{mode.eta}</p>
                  </div>
                  <p className="text-cyan-300">{mode.fee}%</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent activity</h2>
              <button className="text-sm text-cyan-400">View all</button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div key={item.title} className="flex items-center justify-between border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-slate-400">{item.detail}</p>
                  </div>
                  <p className={`font-semibold ${item.amount.startsWith("+") ? "text-emerald-400" : "text-rose-400"}`}>
                    {item.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
            <h2 className="text-xl font-semibold">AI assistant</h2>
            <div className="mt-4 rounded-2xl bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Suggested action</p>
              <p className="mt-2 text-lg font-semibold">Increase emergency fund by 12% this month</p>
            </div>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li>• Set spending cap for entertainment</li>
              <li>• Auto-save 15% of salary</li>
              <li>• Rebalance crypto allocation</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
