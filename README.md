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
