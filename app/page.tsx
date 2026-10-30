"use client";

import { useEffect, useState } from "react";

const timeZones = [
  { label: "UTC", value: "Etc/UTC" },
  { label: "New York", value: "America/New_York" },
  { label: "London", value: "Europe/London" },
  { label: "Dubai", value: "Asia/Dubai" },
  { label: "Singapore", value: "Asia/Singapore" },
  { label: "Tokyo", value: "Asia/Tokyo" },
];

function formatTimeInTimeZone(timeZone: string) {
  const now = new Date();
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(now);
}

export default function Home() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10">
        <header className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Global clock</p>
          <h1 className="mt-3 text-4xl font-black md:text-5xl">Current time across time zones</h1>
        </header>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Local device time</p>
          <div className="mt-3 text-3xl font-bold md:text-5xl">
            {new Intl.DateTimeFormat("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
              weekday: "short",
              month: "short",
              day: "numeric",
            }).format(now)}
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {timeZones.map((zone) => (
            <div
              key={zone.value}
              className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-5 shadow-soft"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">{zone.label}</p>
              <div className="mt-4 text-3xl font-bold text-white">
                {new Intl.DateTimeFormat("en-US", {
                  timeZone: zone.value,
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                }).format(now)}
              </div>
              <p className="mt-3 text-sm text-slate-400">
                {new Intl.DateTimeFormat("en-US", {
                  timeZone: zone.value,
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                }).format(now)}
              </p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
