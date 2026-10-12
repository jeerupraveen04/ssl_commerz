import { config } from "../config";

export interface InitiateInput {
  total_amount: string;
  currency?: string;
  tran_id: string;
  cus_name: string;
  cus_email: string;
  cus_add1?: string;
  cus_city?: string;
  cus_postcode?: string;
  cus_country?: string;
  cus_phone?: string;
  product_name?: string;
  product_category?: string;
  product_profile?: string;
  shipping_method?: string;
}

export interface InitiateResponse {
  status: string;
  failedreason?: string;
  sessionkey?: string;
  GatewayPageURL?: string;
  redirectGatewayURL?: string;
  storeLogo?: string;
  [key: string]: unknown;
}

function formEncode(data: Record<string, string | undefined>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value);
    }
  }
  return params.toString();
}

export async function initiatePayment(
  input: InitiateInput
): Promise<InitiateResponse> {
  const callback = config.backendPublicUrl;

  const payload: Record<string, string | undefined> = {
    store_id: config.store.id,
    store_passwd: config.store.password,
    total_amount: input.total_amount,
    currency: input.currency ?? "BDT",
    tran_id: input.tran_id,
    success_url: `${callback}/api/payment/success`,
    fail_url: `${callback}/api/payment/fail`,
    cancel_url: `${callback}/api/payment/cancel`,
    ipn_url: `${callback}/api/payment/ipn`,
    cus_name: input.cus_name,
    cus_email: input.cus_email,
    cus_add1: input.cus_add1 ?? "N/A",
    cus_city: input.cus_city ?? "Dhaka",
    cus_postcode: input.cus_postcode ?? "1000",
    cus_country: input.cus_country ?? "Bangladesh",
    cus_phone: input.cus_phone ?? "01711111111",
    shipping_method: input.shipping_method ?? "NO",
    num_of_item: "1",
    product_name: input.product_name ?? "Product",
    product_category: input.product_category ?? "General",
    product_profile: input.product_profile ?? "general",
  };

  const response = await fetch(config.urls.initiate, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formEncode(payload),
  });

  if (!response.ok) {
    throw new Error(`SSLCOMMERZ initiate request failed with HTTP ${response.status}`);
  }

  return (await response.json()) as InitiateResponse;
}

export async function validateOrder(
  valId: string
): Promise<Record<string, unknown>> {
  const url = new URL(config.urls.validate);
  url.searchParams.set("val_id", valId);
  url.searchParams.set("store_id", config.store.id);
  url.searchParams.set("store_passwd", config.store.password);
  url.searchParams.set("format", "json");

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`SSLCOMMERZ validation request failed with HTTP ${response.status}`);
  }

  return (await response.json()) as Record<string, unknown>;
}
