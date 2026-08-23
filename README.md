# TrackSign

AI-powered contract review for freelancers and small digital agencies.

Upload a client contract, statement of work, NDA, or service agreement. TrackSign scans every clause against a structured risk checklist and returns a plain-English report flagging risky, unfair, or unusual terms with severity ratings (High, Medium, Low), explanations of why each term matters, and fairer alternative language.

TrackSign does not provide legal advice. It flags terms worth reviewing with a qualified lawyer.

## How it works

1. A user uploads a contract (PDF).
2. The backend extracts the text and sends it to an AI model guided by a niche-specific risk checklist.
3. The AI returns structured findings: flagged clauses, severity ratings, plain-English explanations, and fairer version suggestions.
4. The report is saved to the user's history and rendered in the dashboard.

## Risk checklist categories

The current checklist is tuned for freelancer and agency contracts:

- Payment terms: net-90 windows, missing deposits, payment gated on vague acceptance criteria, no late fees
- Scope and revisions: unlimited revisions, vague deliverables, no change-order process
- IP and ownership: pre-existing tools swept into assignment, IP transferred before full payment, no portfolio rights
- Liability and indemnification: uncapped liability, broad indemnification, overbroad warranties
- Termination: no kill fee, no notice period, asymmetric cancellation rights
- Secondary flags: non-compete/exclusivity, one-sided confidentiality, far-away arbitration, auto-renewal, overreaching work-for-hire

The checklist is stored as a JSON config file and is designed to be swappable per niche.

## Stack

- Frontend: Next.js (TypeScript, Tailwind CSS)
- Backend: FastAPI (Python)
- Database: PostgreSQL
- Auth: Clerk
- Payments: Stripe
- AI analysis: Claude API (Anthropic)
- Deployment: Vercel (frontend), Render or Railway (backend), managed Postgres with automated daily backups
- Error tracking: Sentry (frontend and backend)

## Project structure

```
tracksign/
  frontend/                    Next.js app
    app/                       Pages and layouts (app router)
    components/                Shared UI components
    lib/                       API client and utilities
  backend/                     FastAPI app
    app/
      core/                    Config, auth, security
      db/                      Database models and connection
      routers/                 API route handlers
      services/                Business logic (extraction, AI review)
      checklists/              Risk checklist JSON configs per niche
```

## Getting started

### Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL (Docker recommended)
- Clerk account (for auth keys)
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

### Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local  # fill in real values, never commit this file
npm run dev
```

The frontend runs at http://localhost:3000.

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
| AI_MODEL_API_KEY | Anthropic API key |

### Frontend (.env.local)

| Variable | Description |
|---|---|
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY | Clerk publishable key (exposed to browser) |
| CLERK_SECRET_KEY | Clerk secret key (server-side only) |
| NEXT_PUBLIC_API_URL | Backend API URL (http://localhost:8000 in dev) |

Never commit .env or .env.local. The .gitignore is configured to block them. Use the .env.example files as reference.

## Business model

- Free tier: one contract review with severity ratings and summary flags
- Pro tier ($39/month): unlimited reviews, full explanations, fairer version suggestions, saved review history
- Team tier (planned): multi-seat access for agencies

## Architecture decisions

- The risk checklist is a swappable JSON config, not hardcoded into prompts. Adding a new niche (commercial leases, vendor agreements) means adding a new checklist file and a selector, not rewriting the AI service.
- The AI model provider is abstracted behind a config variable. Switching providers requires changing two env vars and one adapter function.
- Stripe subscription status is the backend's single source of truth, updated via webhooks with idempotent event processing.
- Free tier gating is a simple review count check in Postgres, not Stripe metering.
- File uploads are validated for type (PDF only in v1) and size before processing.

## Status

Active development. The landing page and project structure are complete. Next milestones: Clerk auth integration, database schema and models, contract upload and text extraction, AI review pipeline, Stripe billing.

## License

Proprietary. All rights reserved.
