"use client";

import { useEffect, useState } from "react";

type Joke = {
  category: string;
  type: string;
  joke?: string;
  setup?: string;
  delivery?: string;
};

const fallbackJoke = "Why do programmers prefer dark mode? Because light attracts bugs.";

export default function Home() {
  const [joke, setJoke] = useState<string>(fallbackJoke);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchJoke = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://v2.jokeapi.dev/joke/Any?type=single", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch joke");
      }

      const data: Joke = await response.json();

      if (data.joke) {
        setJoke(data.joke);
      } else if (data.setup && data.delivery) {
        setJoke(`${data.setup} ${data.delivery}`);
      } else {
        setJoke(fallbackJoke);
      }
    } catch {
      setError("Could not load a joke right now. Try again in a moment.");
      setJoke(fallbackJoke);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-10">
        <div className="w-full rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-soft">
          <p className="text-center text-sm uppercase tracking-[0.35em] text-cyan-400">Random joke generator</p>

          <h1 className="mt-5 text-center text-4xl font-black md:text-5xl">Your daily laugh</h1>

          <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800 p-6">
            {loading ? (
              <p className="text-center text-lg text-slate-300">Loading a fresh joke...</p>
            ) : (
              <p className="text-center text-xl leading-relaxed text-slate-100 md:text-2xl">{joke}</p>
            )}
          </div>

          {error ? <p className="mt-4 text-center text-sm text-rose-400">{error}</p> : null}

          <div className="mt-8 flex justify-center">
            <button
              onClick={fetchJoke}
              className="rounded-full bg-cyan-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              {loading ? "Loading..." : "Tell me another joke"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
