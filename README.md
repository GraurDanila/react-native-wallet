# React Native Wallet - E-Wallet App

Aplicatie mobila full-stack pentru gestiunea finantelor personale.
Inregistreaza venituri si cheltuieli, vizualizeaza soldul in timp real.

## Tehnologii
- Frontend: React Native + Expo ~54 + Expo Router
- Autentificare: Clerk
- Backend: Node.js + Express
- Baza de date: PostgreSQL (Neon serverless)
- Rate limiting: Upstash Redis
- Deployment: Render

## Instalare si rulare
# Backend
cd backend && npm install
cp .env.example .env   # completeaza variabilele
npm run dev

# Mobile
cd mobile && npm install
npx expo start

## Variabile de mediu necesare
DATABASE_URL=         # Neon PostgreSQL
UPSTASH_REDIS_URL=    # Upstash Redis
CLERK_PUBLISHABLE_KEY=
