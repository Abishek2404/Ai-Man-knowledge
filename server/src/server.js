import "dotenv/config";
import express from "express";
import cors from "cors";
import claimRoutes from "./routes/claimRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import { connectDatabase } from "./config/database.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { enableMemoryStore, seedClaimsIfEmpty } from "./models/Claim.js";

const app = express();
const port = process.env.PORT || 4000;
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: clientOrigin }));
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "aiman-api" });
});

app.use("/api/claims", claimRoutes);
app.use("/api/reviews", reviewRoutes);
app.use(errorMiddleware);

async function startServer() {
  try {
    await connectDatabase();
    await seedClaimsIfEmpty();
  } catch (error) {
    enableMemoryStore();
    console.warn("MongoDB connection failed:", error.message);
    console.warn("Using in-memory claim data for this local session.");
  }

  app.listen(port, () => {
    console.log(`AIMan API running on http://localhost:${port}`);
  });
}

startServer();
