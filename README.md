# AI Universal Wallet

AI Universal Wallet is a modern finance dashboard with AI-driven insights, smart low-fee transfers, and wallet analytics. It is designed to help users monitor balances, automate savings habits, and understand spending patterns with a clean interface.

## Features
- AI-powered wallet insights
- Smart transfer fee calculator
- Cash flow cards and recent activity
- Low-fee transfer model
- Dashboard-first UX
- Ready for extension with auth, database, and real payment providers

## Tech stack
- Next.js 14
- TypeScript
- Tailwind CSS
- OpenAI integration (optional)

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Environment variables

Copy `.env.example` to `.env.local` and add your values.

```bash
cp .env.example .env.local
```

## Notes
This starter app uses a smart fallback AI flow when no OpenAI API key is configured, so it can run without a paid service. Transfer fees are intentionally low and designed to be adjustable depending on the payment method.
