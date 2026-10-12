import express from "express";
import cors from "cors";
import { config } from "./config";
import { paymentRouter } from "./routes/payment";

const app = express();

app.use(
  cors({
    origin: config.corsOrigins.length > 0 ? config.corsOrigins : true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({ service: "sslcommerz-backend", status: "ok" });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", env: config.nodeEnv, time: new Date().toISOString() });
});

app.use("/api/payment", paymentRouter);

app.use((_req, res) => {
  res.status(404).json({ status: "FAILED", failedreason: "Not found" });
});

app.listen(config.port, () => {
  console.log(`SSLCOMMERZ backend listening on port ${config.port} (${config.nodeEnv})`);
  console.log(`  store_id:        ${config.store.id}`);
  console.log(`  initiate URL:    ${config.urls.initiate}`);
  console.log(`  backend base:    ${config.backendPublicUrl}`);
  console.log(`  frontend origin: ${config.frontendUrl}`);
});

export default app;
