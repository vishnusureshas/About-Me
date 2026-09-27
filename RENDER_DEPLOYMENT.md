# Render Deployment Guide — My-Profile

Backend: Express (`server/`) on Render Web Service  
Frontend: Next.js already deployed (Vercel/Netlify) — connect via `NEXT_PUBLIC_API_URL`

## 1. Prerequisites
- Repo pushed to GitHub with `server/` folder
- MongoDB Atlas `cluster0` resumed and IP `0.0.0.0/0` in Network Access
- Frontend deployed URL (e.g. `https://my-profile.vercel.app`)
- Redis Cloud / Upstash URL (optional, fallback-memory works)

## 2. Deploy Backend on Render
1. https://dashboard.render.com -> **New Web Service** -> Connect repo `My-Profile`
2. Settings:
   - **Name:** `my-profile-server`
   - **Root Directory:** `server`
   - **Runtime:** `Node`
   - **Build Command:** `npm ci`
   - **Start Command:** `node server.js`
   - **Node Version:** `20`
   - **Health Check Path:** `/api/health` (`server/server.js:48`)
3. **Environment -> Add:**
   ```
   MONGODB_URI=mongodb+srv://vishnuasuresh2000_db_user:mx76Uv8dyMdZcxTd@cluster0.9nklskq.mongodb.net/my-profile
   REDIS_URL=rediss://:pass@host:6379          # Upstash/Redis Cloud; leave empty for fallback-memory (server/config/redis.js:22)
   FRONTEND_URL=https://<your-frontend>.vercel.app  # exact frontend URL for CORS (server/server.js:20)
   SESSION_SECRET=<32+ random chars, e.g. openssl rand -base64 32>
   NODE_ENV=production
   # PORT is auto-injected by Render, do not set
   ```
4. Deploy -> wait `Server running on http://localhost:10000` + `Connected to MongoDB Atlas`
5. Copy URL: `https://my-profile-server.onrender.com`
6. Verify:
   ```bash
   curl https://my-profile-server.onrender.com/api/health
   # {"status":"ok","db":"connected","redis":"connected"|"fallback-memory","session":"enabled"}

   curl https://my-profile-server.onrender.com/
   # {"status":"ok","message":"My-Profile API is running"}

   curl https://my-profile-server.onrender.com/api/contacts
   # {"count":...}
   ```

## 3. Connect Frontend (Already Deployed)
1. Vercel/Netlify -> Project -> **Settings -> Environment Variables** -> Add:
   ```
   NEXT_PUBLIC_API_URL=https://my-profile-server.onrender.com/api
   ```
   No trailing slash. Used in `src/components/Contact.tsx:8`:
   ```ts
   const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api").replace(/\/+$/, "")
   fetch(`${API_URL}/contacts`, {method:"POST", body: JSON.stringify({name,email,message})})
   ```
2. **Redeploy** frontend (env baked at `next build`)
3. Test contact form -> `201 {message:"Message sent successfully"}` -> check `GET https://.../api/contacts` shows entry
   - Caching: `X-Cache: MISS` first, `HIT` second (`server/middleware/cache.js:15`)
   - Rate limit: `5 / 15min` per IP (`server/middleware/rateLimitRedis.js:7`) -> `429` after 5

## 4. CORS & Session
- `server/server.js:26` allows `FRONTEND_URL` + `localhost:3000`, `credentials:true` for `myprofile.sid` cookie (`server/middleware/session.js:16`)
- If CORS `403 CORS blocked: https://... not allowed`, update `FRONTEND_URL` in Render and redeploy

## 5. Local Docker Alternative
```bash
docker compose up -d --build # redis:6382, server:5000, web:3000, nginx:80 (nginx/nginx.conf:1)
curl http://localhost/api/health          # via nginx
curl http://localhost:5000/api/health     # direct
```
Volumes: `redis_data`, `server_logs`, `nginx_cache`; Network: `my-profile-net` (`docker-compose.yml:109`)

## 6. Troubleshooting
| Symptom | Fix |
|---------|-----|
| `db: disconnected` | Atlas paused -> Resume; add `0.0.0.0/0` in Network Access; check `MONGODB_URI` |
| `redis: disconnected` | Check `REDIS_URL` (Upstash needs `rediss://`); empty = `fallback-memory` works |
| `403 CORS blocked` | Set `FRONTEND_URL` exactly to frontend origin |
| `413 Payload too large` | `express.json limit 10kb` (`server.js:39`) — trim message <2000 chars |
| `429 Too many requests` | Rate limit 5/15min per IP — wait or change `RATE_LIMIT_MAX` |

## 7. URLs After Deploy
- Backend health: `https://<render>.onrender.com/api/health`
- Backend root: `https://<render>.onrender.com/`
- Frontend env: `NEXT_PUBLIC_API_URL=https://<render>.onrender.com/api`
