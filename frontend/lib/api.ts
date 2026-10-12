export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export interface InitiateRequest {
  total_amount: string;
  currency?: string;
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
}

export interface InitiateResponse {
  status: string;
  failedreason?: string;
  tran_id?: string;
  sessionkey?: string;
  GatewayPageURL?: string;
}

export async function initiatePayment(
  input: InitiateRequest
): Promise<InitiateResponse> {
  const response = await fetch(`${API_BASE_URL}/api/payment/initiate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = (await response.json().catch(() => ({}))) as InitiateResponse;

  if (!response.ok) {
    throw new Error(
      data.failedreason ?? `Payment initiation failed (HTTP ${response.status})`
    );
  }

  if (data.status !== "SUCCESS" || !data.GatewayPageURL) {
    throw new Error(data.failedreason ?? "SSLCOMMERZ did not return a gateway URL");
  }

  return data;
}
