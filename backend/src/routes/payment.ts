import { Router, type Request, type Response } from "express";
import { config } from "../config";
import { initiatePayment, validateOrder } from "../services/sslcommerz";
import { validateIpnSignature } from "../utils/hash";
import { transactionStore } from "../store";

export const paymentRouter = Router();

type Outcome = "success" | "fail" | "cancel";

function buildFrontendUrl(path: string, params: Record<string, string | undefined>): string {
  const url = new URL(path, `${config.frontendUrl}/`);
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      url.searchParams.set(key, value);
    }
  }
  return url.toString();
}

paymentRouter.post("/initiate", async (req: Request, res: Response) => {
  try {
    const body = req.body ?? {};
    const totalAmount = Number(body.total_amount);
    const { cus_name, cus_email, currency } = body;

    if (!body.total_amount || !cus_name || !cus_email) {
      res.status(400).json({
        status: "FAILED",
        failedreason: "total_amount, cus_name and cus_email are required",
      });
      return;
    }

    if (!Number.isFinite(totalAmount) || totalAmount < 10 || totalAmount > 500000) {
      res.status(400).json({
        status: "FAILED",
        failedreason: "total_amount must be between 10.00 and 500000.00 BDT",
      });
      return;
    }

    const tranId = `TXN-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;

    const result = await initiatePayment({
      total_amount: totalAmount.toFixed(2),
      currency,
      tran_id: tranId,
      cus_name,
      cus_email,
      cus_add1: body.cus_add1,
      cus_city: body.cus_city,
      cus_postcode: body.cus_postcode,
      cus_country: body.cus_country,
      cus_phone: body.cus_phone,
      product_name: body.product_name,
      product_category: body.product_category,
      product_profile: body.product_profile,
    });

    if (result.status !== "SUCCESS" || !result.GatewayPageURL) {
      res.status(502).json({
        status: "FAILED",
        failedreason: result.failedreason ?? "Unable to create SSLCOMMERZ session",
      });
      return;
    }

    const now = new Date().toISOString();
    transactionStore.upsert({
      tran_id: tranId,
      amount: totalAmount.toFixed(2),
      currency: currency ?? "BDT",
      status: "INITIATED",
      sessionkey: result.sessionkey,
      gatewayPageUrl: result.GatewayPageURL,
      createdAt: now,
      updatedAt: now,
    });

    res.json({
      status: "SUCCESS",
      tran_id: tranId,
      sessionkey: result.sessionkey,
      GatewayPageURL: result.GatewayPageURL,
    });
  } catch (error) {
    console.error("[initiate] error:", error);
    res.status(500).json({
      status: "FAILED",
      failedreason: (error as Error).message,
    });
  }
});

async function handleOutcome(
  req: Request,
  res: Response,
  outcome: Outcome
): Promise<void> {
  const payload = req.body as Record<string, string>;
  const tranId = payload.tran_id ?? "";
  let status = payload.status ?? outcome.toUpperCase();

  const existing = transactionStore.get(tranId);

  if (outcome === "success" && payload.val_id) {
    try {
      const validation = await validateOrder(payload.val_id);
      status = String(validation.status ?? status);
      transactionStore.upsert({
        tran_id: tranId,
        amount: payload.amount ?? existing?.amount ?? "0",
        currency: payload.currency ?? existing?.currency ?? "BDT",
        status,
        sessionkey: existing?.sessionkey,
        gatewayPageUrl: existing?.gatewayPageUrl,
        val_id: payload.val_id,
        bank_tran_id: payload.bank_tran_id,
        card_type: payload.card_type,
        validation,
        createdAt: existing?.createdAt ?? new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("[outcome] validation failed:", error);
    }
  } else if (existing) {
    transactionStore.upsert({
      ...existing,
      status,
      updatedAt: new Date().toISOString(),
    });
  }

  res.redirect(
    buildFrontendUrl(`/payment/${outcome}`, {
      tran_id: tranId,
      status,
      amount: payload.amount,
      val_id: payload.val_id,
    })
  );
}

paymentRouter.post("/success", (req, res) => void handleOutcome(req, res, "success"));
paymentRouter.post("/fail", (req, res) => void handleOutcome(req, res, "fail"));
paymentRouter.post("/cancel", (req, res) => void handleOutcome(req, res, "cancel"));

paymentRouter.post("/ipn", async (req: Request, res: Response) => {
  const payload = req.body as Record<string, string>;

  console.log("[ipn] webhook received:", JSON.stringify(payload, null, 2));

  const signatureValid = validateIpnSignature(payload, config.store.password);

  let validation: Record<string, unknown> | undefined;
  if (payload.status === "VALID" && payload.val_id) {
    try {
      validation = await validateOrder(payload.val_id);
    } catch (error) {
      console.error("[ipn] validation failed:", error);
    }
  }

  const existing = transactionStore.get(payload.tran_id ?? "");
  const now = new Date().toISOString();

  transactionStore.upsert({
    tran_id: payload.tran_id ?? "",
    amount: payload.amount ?? existing?.amount ?? "0",
    currency: payload.currency ?? existing?.currency ?? "BDT",
    status: payload.status ?? "UNKNOWN",
    sessionkey: existing?.sessionkey,
    gatewayPageUrl: existing?.gatewayPageUrl,
    val_id: payload.val_id,
    bank_tran_id: payload.bank_tran_id,
    card_type: payload.card_type,
    ipnPayload: payload,
    validation,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  });

  console.log(
    `[ipn] handled tran_id=${payload.tran_id} status=${payload.status} ` +
      `signatureValid=${signatureValid} ` +
      `validationStatus=${validation ? String(validation.status ?? "") : "n/a"}`
  );

  res.status(200).send("IPN received");
});

paymentRouter.get("/validate/:val_id", async (req: Request, res: Response) => {
  try {
    const result = await validateOrder(req.params.val_id);
    res.json(result);
  } catch (error) {
    console.error("[validate] error:", error);
    res.status(502).json({
      status: "FAILED",
      failedreason: (error as Error).message,
    });
  }
});

paymentRouter.get("/transactions", (_req: Request, res: Response) => {
  res.json({ transactions: transactionStore.all() });
});
