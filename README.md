# TrackSign

AI-powered contract review for freelancers and small agencies. Upload a contract, get a plain-English report flagging risky, unfair, or unusual terms, with severity ratings and plain-language explanations.

TrackSign does not provide legal advice. It flags terms worth reviewing with a qualified lawyer.

## Stack

- Frontend: Next.js
- Backend: FastAPI
- Database: PostgreSQL
- Auth: Clerk
- Payments: Stripe
- AI analysis: [model provider]

## Project structure

tracksign/
  frontend/    Next.js app
  backend/     FastAPI app

## Getting started

### Backend

cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in real values, never commit this file
uvicorn app.main:app --reload

### Frontend

cd frontend
npm install
cp .env.local.example .env.local   # fill in real values, never commit this file
npm run dev

### Database

Postgres is expected to be running locally (Docker recommended) and reachable at the DATABASE_URL set in backend/.env.

## Environment variables

Backend (.env):
- DATABASE_URL
- CLERK_SECRET_KEY
- CLERK_PUBLISHABLE_KEY
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- AI_MODEL_API_KEY

Frontend (.env.local):
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- CLERK_SECRET_KEY
- NEXT_PUBLIC_API_URL

Never commit .env or .env.local. Use the .env.example files as reference.

## Status

Early development. Free tier: one contract review. Paid tier: unlimited reviews, full explanations, saved history.

## License

Proprietary. All rights reserved.
