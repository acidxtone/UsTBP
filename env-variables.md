# TRADEBENCHPREP - ENVIRONMENT VARIABLE NAMES

## 🔧 VARIABLE NAMES USED IN WEBAPP

### Frontend Variables (Vite)
```bash
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

### Backend Variables (Node.js)
```bash
DATABASE_URL
SESSION_SECRET
NODE_ENV
```

### Optional Variables
```bash
VITE_ADSENSE_CLIENT_ID
VITE_STRIPE_PUBLIC_KEY
STRIPE_SECRET_KEY
VITE_GA_TRACKING_ID
DEBUG
API_BASE_URL
```

---

## 🔍 WHERE VARIABLES ARE USED

### Frontend (React/Vite)
- `VITE_SUPABASE_URL` → `src/lib/supabase.js`
- `VITE_SUPABASE_ANON_KEY` → `src/lib/supabase.js`
- `VITE_ADSENSE_CLIENT_ID` → AdSense components
- `VITE_STRIPE_PUBLIC_KEY` → Payment components
- `VITE_GA_TRACKING_ID` → Analytics

### Backend (Node.js/Express)
- `DATABASE_URL` → `server/db.ts`
- `SESSION_SECRET` → `server/index.ts`
- `NODE_ENV` → `server/index.ts`
- `STRIPE_SECRET_KEY` → Payment routes
- `DEBUG` → Development logging
- `API_BASE_URL` → API configuration
