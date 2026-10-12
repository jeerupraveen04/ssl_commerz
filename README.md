# ssl_commerz — Hosted Checkout (Next.js + TypeScript backend)

End-to-end SSLCOMMERZ **Hosted Payment** integration.

- **Frontend** (`frontend/`) — Next.js (App Router) hosted checkout + result pages. Deploys to **Vercel**.
- **Backend** (`backend/`) — TypeScript + Express API that creates the session, receives IPN, and validates orders server-to-server. Deploys to **Render**.
- **Docs** — `plan.md` (detailed request/response reference) and `SSLCOMMERZ.md` (full research doc).

## Flow

```
Customer (Next.js)          Backend (Express/TS)              SSLCOMMERZ
   │  POST /api/payment/initiate │                              │
   ├────────────────────────────►│  POST /gwprocess/v4/api.php  │
   │                             ├─────────────────────────────►│
   │                             │◄──── GatewayPageURL ─────────┤
   │◄──── GatewayPageURL ────────┤                              │
   │  redirect to GatewayPageURL ──────────────────────────────►│  customer pays
   │                             │◄──── POST success_url ───────┤
   │                             │  GET validationserverAPI.php │
   │                             ├─────────────────────────────►│
   │◄── redirect /payment/success│                              │
   │                             │◄──── POST ipn_url ───────────┤  (server-to-server)
```

## Project structure

```
ssl_commerz/
├── backend/                 # Render service (TypeScript)
│   ├── src/
│   │   ├── index.ts         # Express app + middleware
│   │   ├── config.ts        # env-driven configuration
│   │   ├── routes/payment.ts# initiate / success / fail / cancel / ipn / validate
│   │   ├── services/sslcommerz.ts
│   │   ├── utils/hash.ts    # IPN MD5 signature validation
│   │   └── store.ts         # in-memory transaction store
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/                # Vercel project (Next.js)
│   ├── app/                 # /, /checkout, /payment/{success,fail,cancel}
│   ├── components/CheckoutForm.tsx
│   ├── lib/api.ts
│   ├── vercel.json
│   ├── .env.example
│   └── package.json
├── render.yaml              # Render blueprint for backend
├── plan.md
└── SSLCOMMERZ.md
```

## API (backend)

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/api/payment/initiate` | Validate input → create SSLCOMMERZ session → return `GatewayPageURL` |
| `POST` | `/api/payment/success` | SSLCOMMERZ redirect target → validate order → redirect to frontend |
| `POST` | `/api/payment/fail` | Redirect target for failed payments |
| `POST` | `/api/payment/cancel` | Redirect target for cancelled payments |
| `POST` | `/api/payment/ipn` | Instant Payment Notification listener (validates signature) |
| `GET`  | `/api/payment/validate/:val_id` | Proxy to Order Validation API |
| `GET`  | `/api/payment/transactions` | Inspect in-memory transactions (demo) |
| `GET`  | `/health` | Render health check |

## Local development

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev          # http://localhost:8080
```

Sandbox defaults (`testbox` / `qwerty`) work out of the box.

### 2. Frontend

```bash
cd frontend
cp .env.example .env.local      # NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
npm install
npm run dev                     # http://localhost:3000
```

Open http://localhost:3000 → **Go to checkout**.

> **IPN note:** SSLCOMMERZ needs a public URL to reach `success_url` / `ipn_url`. Locally, expose the backend with a tunnel (e.g. `ngrok http 8080`) and set `BACKEND_PUBLIC_URL` to the tunnel URL.

### Test cards (sandbox)

| Card | Number | Exp | CVV |
|---|---|---|---|
| VISA | `4111111111111111` | 12/26 | 111 |
| Mastercard | `5111111111111111` | 12/26 | 111 |
| AMEX | `371111111111111` | 12/26 | 111 |

Mobile OTP: `111111` or `123456`

## Deployment

### Backend → Render

1. Push this repo to GitHub.
2. Render → **New → Blueprint** → select the repo (uses `render.yaml`).
3. Set the secret env vars in the dashboard: `SSLCOMMERZ_STORE_ID`, `SSLCOMMERZ_STORE_PASSWD`, `BACKEND_PUBLIC_URL` (`https://<service>.onrender.com`), `FRONTEND_URL` (your Vercel URL), `CORS_ORIGIN` (your Vercel URL).
4. Health check: `/health`.

### Frontend → Vercel

1. Vercel → **New Project** → import the repo.
2. Set **Root Directory** to `frontend`.
3. Add env var `NEXT_PUBLIC_API_BASE_URL` = your Render URL (`https://<service>.onrender.com`).
4. Deploy.

After both are live, set the backend's `BACKEND_PUBLIC_URL` to the Render URL and `FRONTEND_URL` / `CORS_ORIGIN` to the Vercel URL, then redeploy the backend.

### Going live

Swap these backend env vars to the production endpoints and use your live store credentials:

```
SSLCOMMERZ_INITIATE_URL=https://securepay.sslcommerz.com/gwprocess/v4/api.php
SSLCOMMERZ_VALIDATE_URL=https://securepay.sslcommerz.com/validator/api/validationserverAPI.php
```

Also whitelist your server IPs per the Networking section of `SSLCOMMERZ.md`.
