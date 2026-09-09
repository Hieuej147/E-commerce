# 🛒 E-Commerce Customer Storefront

Modern, high-performance customer-facing storefront web application built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **TanStack React Query**, and **Clerk Authentication**.

---

## 🔗 Ecosystem Repositories

This project is part of an integrated 4-part microservices platform:

| Repository | Tech Stack | Role & Link |
| :--- | :--- | :--- |
| **Backend Monorepo** | NestJS 11, gRPC, PostgreSQL, Prisma, Inngest | RESTful API Gateway, gRPC services, Stripe & Clerk webhooks. <br>🔗 Repo: [`https://github.com/Hieuej147/ecommerce-backend.git`](https://github.com/Hieuej147/ecommerce-backend.git) |
| **Customer Storefront** (This repo) | Next.js 16, React 19, Tailwind v4 | Customer shop, responsive featured hero banner, cart, Stripe checkout. <br>🔗 Repo: [`https://github.com/Hieuej147/-E-commerce.git`](https://github.com/Hieuej147/-E-commerce.git) |
| **Admin Dashboard** | React 19, Vite, TypeScript, Cloudflare Zero Trust | Backoffice management, real-time KPI metrics, orders & catalog CRUD. <br>🔗 Repo: [`https://github.com/Hieuej147/dashboard-admin-ecommern.git`](https://github.com/Hieuej147/dashboard-admin-ecommern.git) |
| **DevOps & GitOps (IaC & Manifests)** | Terraform, Helm, AWS EKS, AWS ECR, OIDC | Infrastructure as Code, OIDC authentication, 9 ECR registries, Kubernetes manifests. <br>🔗 Repo: [`https://github.com/Hieuej147/ecommerce-devops.git`](https://github.com/Hieuej147/ecommerce-devops.git) |

---

## 📌 Architecture Reference & Enhancements

> **Architecture Reference:** Inspired by and adapted from the e-commerce architecture pattern in [Jayce-Anh/shopping-cart-project](https://github.com/Jayce-Anh/shopping-cart-project) (originally based on [sivaprasadreddy/spring-boot-microservices-series](https://github.com/sivaprasadreddy/spring-boot-microservices-series.git)).

### Key Adaptations & Improvements:
1. **Next.js 16 App Router & Turbopack**: Replaced the basic legacy React 18 single-page app with Next.js 16 Server Components, delivering fast initial page loads, streaming SSR, and automated SEO optimization.
2. **Modern Responsive UI**: Built with Tailwind CSS v4, featuring a clean hero showcase banner, responsive product grid, and streamlined checkout flow.
3. **Internal API Rewrites (No CORS Issues)**: All frontend requests pass through Next.js internal rewrites (`/api/backend/:path*` -> `BACKEND_API_URL`), protecting internal backend endpoints from browser inspection and eliminating cross-origin errors.
4. **Seamless Interconnection with Admin Dashboard**: Includes an automatic admin role detector (`AdminAccountNotice` component); when an administrator logs in, the banner presents a direct shortcut to the Admin Dashboard (`NEXT_PUBLIC_ADMIN_DASHBOARD_URL`).

---

## 🌟 Core Features

- 🛍️ **Product Catalog & Discovery**: Instant search, category filters, and high-resolution product showcases.
- 🎨 **Featured Hero Banner**: Prominent showcase banner for seasonal highlights and campaigns.
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

# 2. Clone all 4 repositories
git clone https://github.com/Hieuej147/ecommerce-backend.git backend
git clone https://github.com/Hieuej147/-E-commerce.git storefront
git clone https://github.com/Hieuej147/dashboard-admin-ecommern.git admin-dashboard
git clone https://github.com/Hieuej147/ecommerce-devops.git devops

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

- **Dockerfile**: Optimized multi-stage Docker build utilizing Next.js `output: "standalone"` to create a minimal production image (~180MB).
- **CI/CD Workflow** (`.github/workflows/ci-cd.yml`):
  - On PR & push to `main`: Runs lint checks.
  - On push to `main`: Uses **AWS IAM OIDC** (Zero static keys) to authenticate with AWS.
  - Injects production build arguments (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_ADMIN_DASHBOARD_URL`, `BACKEND_API_URL`).
  - Builds and pushes the container image to **Amazon ECR** (`prod-ecommerce-storefront`).
  - Connects to **Amazon EKS** via IAM OIDC Access Entry and executes an instant zero-downtime rolling restart (`kubectl rollout restart deployment/storefront -n ecommerce`).

---

## 🚀 How to Deploy to AWS

For the complete AWS infrastructure setup, consult our primary infrastructure repository: [`ecommerce-devops`](https://github.com/Hieuej147/ecommerce-devops.git).

### Quick Deployment Flow:
1. **GitHub Secrets Configuration**:
   In this repository's **Settings** > **Secrets and variables** > **Actions** > **New repository secret**:
   - `AWS_ROLE_ARN`: `arn:aws:iam::<YOUR_AWS_ACCOUNT_ID>:role/prod-ecommerce-github-actions-role`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: `pk_test_...`
   - `NEXT_PUBLIC_API_URL`: `/api/backend` (Next.js internal rewrite proxy)
   - `NEXT_PUBLIC_ADMIN_DASHBOARD_URL`: `https://admin.yourdomain.com`
2. **Deploy to Production**:
   Push your changes to `main`:
   ```bash
   git add .
   git commit -m "feat: storefront enhancement"
   git push origin main
   ```
   GitHub Actions will automatically test, build, push to AWS ECR, and deploy to EKS with zero downtime!
