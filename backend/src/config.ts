import dotenv from "dotenv";

dotenv.config();

function env(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

const port = Number(process.env.PORT ?? 8080);

export const config = {
  port,
  nodeEnv: process.env.NODE_ENV ?? "development",
  store: {
    id: env("SSLCOMMERZ_STORE_ID", "testbox"),
    password: env("SSLCOMMERZ_STORE_PASSWD", "qwerty"),
  },
  urls: {
    initiate: env(
      "SSLCOMMERZ_INITIATE_URL",
      "https://sandbox.sslcommerz.com/gwprocess/v4/api.php"
    ),
    validate: env(
      "SSLCOMMERZ_VALIDATE_URL",
      "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php"
    ),
  },
  backendPublicUrl: trimTrailingSlash(
    env("BACKEND_PUBLIC_URL", `http://localhost:${port}`)
  ),
  frontendUrl: trimTrailingSlash(env("FRONTEND_URL", "http://localhost:3000")),
  corsOrigins: env("CORS_ORIGIN", "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};

export type AppConfig = typeof config;
