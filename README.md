# AIMan Knowledge Commons

AIMan Knowledge Commons is a human-in-the-loop knowledge validation prototype. Contributors submit real-world knowledge claims, the system scores submission quality, and reviewers validate the claims before they become useful for AI systems.

## Project Structure

```txt
client/   Next.js frontend
server/   Express API prototype
AiMan.md  Product/project brief
```

## Phase Roadmap

1. Foundation scaffold: pages, components, scoring model, local prototype data.
2. API integration: connect the frontend to the server.
3. Persistence: replace in-memory/local storage with Supabase or a database.
4. Reviewer workflow: moderation history, reviewer assignment, audit trail.
5. AI knowledge export: verified claim export for RAG, evaluation, or knowledge base use.

## Local Development

Install dependencies:

```bash
npm.cmd install
```

Run the client:

```bash
npm.cmd run dev:client
```

Run the server:

```bash
npm.cmd run dev:server
```

The server uses MongoDB for persistence. Create `server/.env` from `server/.env.example`
and set `MONGODB_URI` to your local MongoDB or MongoDB Atlas connection string.

## Deploy Frontend to Vercel

Deploy the Next.js frontend as the Vercel project:

1. Push this repository to GitHub.
2. In Vercel, create a new project from the repository.
3. Set the project Root Directory to `client`.
4. Keep the Framework Preset as `Next.js`.
5. Leave Build Command as `npm run build`.
6. Leave Output Directory as `.next`.

The frontend can run without the Express API by using browser storage fallback data. If you deploy
the API separately, add this Vercel environment variable to the frontend project:

```txt
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```
