# TrackSign

AI-powered contract review for businesses and professionals.

Upload any contract (service agreement, vendor contract, NDA, lease, employment agreement, SOW, or partnership deal) and TrackSign scans every clause against a structured risk checklist. You get a plain-English report flagging risky, unfair, or unusual terms with severity ratings (High, Medium, Low), explanations of why each term matters, and fairer alternative language you can propose.

TrackSign does not provide legal advice. It flags terms worth reviewing with a qualified lawyer.

## Products

**TrackSign Web** — Self-serve contract review at tracksign.com. Sign up, upload a contract, get your report. Free tier includes one review. Pro tier ($39/month) includes unlimited reviews, full explanations, fairer version suggestions, and saved review history.

**TrackSign Enterprise** — White-label Windows desktop application for corporate teams. Branded per client with company logo, colors, and SSO authentication (Azure AD / OIDC). Enterprise features include batch review, team analytics, risk dashboards, and priority AI model access. Each corporate client receives a custom-branded installer.

Both products connect to the same backend API.

## How it works

1. A user uploads a contract (PDF).
2. The backend extracts the text and sends it to an AI model guided by a risk checklist matched to the contract type.
3. The AI returns structured findings: flagged clauses, severity ratings, plain-English explanations, and fairer version suggestions.
4. The report is saved to the user's history and rendered in the dashboard.

## Supported contract types

TrackSign auto-detects contract type or lets users select manually:

- Service agreements and consulting contracts
- Vendor and supplier contracts
- Non-disclosure agreements (NDAs)
- Lease and rental agreements
- Employment contracts
- Statements of work (SOWs)
- Partnership agreements
- Licensing agreements
- General business contracts

Each contract type is matched to a specialized risk checklist. New checklists can be added as JSON config files without changing any code.

## Risk checklist categories

The general checklist covers:

- Payment and compensation: long payment windows, missing deposits, vague acceptance gating, no late fees
- Scope and deliverables: unlimited revisions, vague deliverables, no change-order process
- Intellectual property: pre-existing IP swept into assignment, IP transferred before full payment, no reuse rights
- Liability and indemnification: uncapped liability, broad indemnification, overbroad warranties
- Termination: no kill fee, short notice periods, asymmetric cancellation rights
- Non-compete and exclusivity: overbroad restrictions, unreasonable duration
- Confidentiality: one-sided obligations, excessive duration
- Auto-renewal: lock-in without opt-out notice
- Governing law and disputes: inconvenient jurisdiction, mandatory arbitration
- Data and privacy: broad data collection, no breach notification
- Insurance and warranties: disproportionate coverage, overbroad representations

Specialized checklists exist for NDAs, employment contracts, leases, service agreements, and vendor contracts.

## Stack

- Frontend (Web): Next.js, TypeScript, Tailwind CSS
- Desktop (Enterprise): C# / WPF (.NET 8), MVVM with CommunityToolkit.Mvvm
- Backend: FastAPI (Python)
- Database: PostgreSQL
- Auth (Web): Clerk
- Auth (Desktop): Microsoft Identity (MSAL) for Azure AD SSO
- Payments: Stripe
- AI analysis: Claude API (Anthropic)
- Deployment: Vercel (frontend), Render or Railway (backend), managed Postgres with automated daily backups
- Error tracking: Sentry

## Project structure

```
tracksign/
  frontend/                        Next.js web app
    app/                           Pages and layouts (app router)
    components/                    Shared UI components
    lib/                           API client, auth context, review store
  backend/                         FastAPI API server
    app/
      core/                        Config, auth middleware, security
      db/                          Database models and connection
      routers/                     API route handlers (contracts, billing, users)
      services/                    Business logic (PDF extraction, AI review)
      checklists/                  Risk checklist JSON configs per contract type
  desktop/                         WPF desktop app (Windows)
    TrackSign/
      Config/                      Branding, auth, and API config (JSON, per-client)
      Assets/                      Logos and icons (swapped per client)
      Models/                      Data classes
      Services/                    Auth, API client, branding, navigation
      ViewModels/                  MVVM view models
      Views/                       XAML views (Login, Dashboard, Upload, Report, History, Analytics, Settings)
      Themes/                      Colors, styles, and data templates
      Converters/                  Value converters (severity to color, file size, etc.)
```

## Getting started

### Prerequisites

- Node.js 18+
- Python 3.11+
- .NET 8+ SDK (for desktop app)
- PostgreSQL (Docker recommended)
- Clerk account (for web auth keys)
- Stripe account (for payment keys)
- Anthropic API key (for contract analysis)

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # fill in real values, never commit this file
uvicorn app.main:app --reload
```

The backend runs at http://localhost:8000. Verify with GET /health.

### Frontend (Web)

```bash
cd frontend
npm install
cp .env.local.example .env.local  # fill in real values, never commit this file
npm run dev
```

The frontend runs at http://localhost:3000.

### Desktop (Enterprise)

```bash
cd desktop/TrackSign
dotnet restore
dotnet run
```

The desktop app opens as a native Windows application. Configure Config/auth.json with SSO credentials. Set devMode to true in auth.json for development without real SSO.

### Database

PostgreSQL must be running locally and reachable at the DATABASE_URL in backend/.env. Recommended setup:

```bash
docker run --name tracksign-db -e POSTGRES_USER=tracksign -e POSTGRES_PASSWORD=tracksign -e POSTGRES_DB=tracksign -p 5432:5432 -d postgres:16
```

## Environment variables

### Backend (.env)

| Variable | Description |
|---|---|
| DATABASE_URL | PostgreSQL connection string |
| CLERK_SECRET_KEY | Clerk backend secret key |
| CLERK_PUBLISHABLE_KEY | Clerk publishable key |
| STRIPE_SECRET_KEY | Stripe secret key |
| STRIPE_WEBHOOK_SECRET | Stripe webhook signing secret |
| STRIPE_PRICE_ID | Stripe price ID for Pro plan |
| ANTHROPIC_API_KEY | Anthropic API key for contract analysis |
| AI_MODEL | Claude model name (default: claude-sonnet-4-20250514) |
| FRONTEND_URL | Frontend URL for CORS and redirects |

### Frontend (.env.local)

| Variable | Description |
|---|---|
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY | Clerk publishable key (exposed to browser) |
| CLERK_SECRET_KEY | Clerk secret key (server-side only) |
| NEXT_PUBLIC_API_URL | Backend API URL (http://localhost:8000 in dev) |

### Desktop (Config/auth.json)

| Field | Description |
|---|---|
| provider | SSO provider type (azure_ad) |
| authority | Azure AD authority URL |
| clientId | Registered application client ID |
| redirectUri | Auth callback URI |
| devMode | Set true for development, false for production |

Never commit .env, .env.local, or auth.json with real credentials. The .gitignore is configured to block them.

## Enterprise white-labeling

Each corporate client receives a branded version of the desktop app. To onboard a new client:

1. Edit Config/branding.json with the client's company name, colors, and support contacts.
2. Edit Config/auth.json with the client's Azure AD tenant ID and registered app client ID.
3. Replace Assets/logo.png with the client's logo.
4. Build and distribute the installer.

The codebase is identical for every client. Only the config files and logo change.

## Business model

### Web (tracksign.com)

- Free tier: one contract review with severity ratings and summary flags
- Pro tier ($39/month): unlimited reviews, full explanations, fairer version suggestions, saved review history
- Team tier (planned): multi-seat access

### Enterprise (desktop app)

- Custom pricing per organization
- Includes SSO, white-labeling, priority AI model, team analytics, and dedicated support
- Sold through direct sales

## Architecture decisions

- Risk checklists are swappable JSON configs, not hardcoded. Adding a new contract type means adding a JSON file, not rewriting code.
- The AI model provider is abstracted behind a config variable. Switching providers requires changing two env vars and one adapter function.
- Both the web app and desktop app call the same backend API. Enterprise users get a different plan tier that unlocks additional features.
- Stripe subscription status is the backend's single source of truth, updated via webhooks with idempotent event processing.
- Free tier gating is a simple review count check in Postgres, not Stripe metering.
- Contract type is auto-detected via keyword analysis, with manual override available.
- File uploads are validated for type (PDF) and size (20MB limit) before processing.
- Desktop SSO uses MSAL with Azure AD, supporting silent token refresh and interactive login fallback.

## Status

Active development.

### Completed

- Landing page with dark theme, product mocks, FAQ, and all footer pages
- Dashboard with upload flow, review history, settings, and sample report
- FastAPI backend with all endpoints, models, services, and checklists
- Multiple risk checklists (general, NDA, employment, lease, service agreement, vendor)
- WPF desktop app with MVVM architecture, SSO auth, white-label config, and enterprise UI
- Analytics dashboard with KPI cards, risk distribution, and review activity charts

### Remaining

- Clerk auth integration on web frontend
- Connect web frontend to real backend API
- Stripe billing setup and testing
- Azure AD app registration for desktop SSO
- End-to-end testing with real contracts
- Deployment (Vercel, Render/Railway, managed Postgres)
- Error tracking (Sentry)

## License

Proprietary. All rights reserved.
