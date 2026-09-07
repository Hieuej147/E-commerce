# 🛒 E-Commerce Customer Storefront

Modern, high-performance customer-facing storefront web application built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **TanStack React Query**, **Three.js**, and **Clerk Authentication**.

---

## 🔗 Ecosystem Repositories

This project is part of an integrated 3-part microservices platform:

| Repository | Tech Stack | Role & Link |
| :--- | :--- | :--- |
| **Backend Monorepo** | NestJS 11, gRPC, PostgreSQL, Prisma, Inngest | RESTful API Gateway, gRPC services, Stripe & Clerk webhooks. <br>🔗 Repo: [`https://github.com/Hieuej147/ecommerce-backend.git`](https://github.com/Hieuej147/ecommerce-backend.git) |
| **Customer Storefront** (This repo) | Next.js 16, React 19, Tailwind v4, Three.js | Customer shop, 3D interactive hero canvas, cart, Stripe checkout. <br>🔗 Repo: [`https://github.com/Hieuej147/-E-commerce.git`](https://github.com/Hieuej147/-E-commerce.git) |
| **Admin Dashboard** | React 19, Vite, TypeScript, Cloudflare Zero Trust | Backoffice management, real-time KPI metrics, orders & catalog CRUD. <br>🔗 Repo: [`https://github.com/Hieuej147/dashboard-admin-ecommern.git`](https://github.com/Hieuej147/dashboard-admin-ecommern.git) |

---

## 📌 Architecture Reference & Enhancements

> **Architecture Reference:** Inspired by and adapted from the e-commerce architecture pattern in [shopping-cart-project](/mnt/disk2/shopping-cart-project) (originally based on [sivaprasadreddy/spring-boot-microservices-series](https://github.com/sivaprasadreddy/spring-boot-microservices-series.git)).

### Key Adaptations & Improvements:
1. **Next.js 16 App Router & Turbopack**: Replaced the basic legacy React 18 single-page app with Next.js 16 Server Components, delivering fast initial page loads, streaming SSR, and automated SEO optimization.
2. **Interactive 3D Experience**: Integrated an interactive Three.js canvas in the hero banner for a distinctive, premium storefront aesthetic.
3. **Internal API Rewrites (No CORS Issues)**: All frontend requests pass through Next.js internal rewrites (`/api/backend/:path*` -> `BACKEND_API_URL`), protecting internal backend endpoints from browser inspection and eliminating cross-origin errors.
4. **Seamless Interconnection with Admin Dashboard**: Includes an automatic admin role detector (`AdminAccountNotice` component); when an administrator logs in, the banner presents a direct shortcut to the Admin Dashboard (`NEXT_PUBLIC_ADMIN_DASHBOARD_URL`).

---

## 🌟 Core Features

- 🛍️ **Product Catalog & Discovery**: Instant search, category filters, and high-resolution product showcases.
- 🎨 **Interactive 3D Hero Banner**: 3D spatial canvas that responds to user cursor movement.
- 🧺 **Cart Management**: Add, update quantity, remove items, and calculate pricing totals automatically.
- 💳 **Stripe Online Checkout**: Direct integration with Stripe payment processing.
- 📦 **Order Tracking**: Review purchase history, live fulfillment milestones, and delivery tracking.
- 🔐 **Authentication via Clerk**: Instant Google OAuth, email verification, and session persistence.
- 🛡️ **Admin Role Detection**: Detects admin privileges and provides a one-click jump to the Admin Dashboard.

---

## 📥 How to Clone & Run All 3 Projects Together

To set up the complete ecosystem on your computer:

```bash
# 1. Create a parent directory
mkdir my-ecommerce && cd my-ecommerce

# 2. Clone all 3 repositories (Replace with your actual GitHub URLs)
git clone https://github.com/Hieuej147/ecommerce-backend.git backend
git clone https://github.com/Hieuej147/-E-commerce.git storefront
git clone https://github.com/Hieuej147/dashboard-admin-ecommern.git admin-dashboard

# 3. Start Backend (Terminal 1)
cd backend
cp .env.example .env
pnpm install
docker compose up -d
pnpm run db:setup
pnpm run dev:all     # Running on port 3000 (Swagger: /docs)

# 4. Start Customer Storefront (Terminal 2)
cd ../storefront
cp .env.example .env.local
pnpm install
pnpm run dev         # Running on port 3001

# 5. Start Admin Dashboard (Terminal 3)
cd ../admin-dashboard
cp .env.example .env
bun install          # or: pnpm install
bun run dev          # Running on port 5173
```

---

## 💻 Local Quickstart (Storefront Only)

If the backend is already running on `http://localhost:3000`:

```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment variables
cp .env.example .env.local
```

Ensure `.env.local` contains:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
BACKEND_API_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_ADMIN_DASHBOARD_URL=http://localhost:5173
```

```bash
# 3. Start development server
pnpm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 🛑 How to Shut Down

- **Stop Storefront**: Press **`Ctrl + C`** in the terminal running `pnpm run dev`.
- **Emergency Port Cleanup**: If port 3001 is hanging, run: `npx kill-port 3001`.

---

## 🐳 Docker & Automated CI/CD (GitHub Actions)

- **Dockerfile**: Configured with Next.js `output: "standalone"` to build a lightweight production container (~100MB).
- **CI/CD Workflow** (`.github/workflows/ci-cd.yml`):
  - Automatically runs linting and typecheck on Pull Requests.
  - On push to `main`, uses **AWS OIDC** to build the standalone image, pushes to **AWS ECR**, and triggers deployment.
