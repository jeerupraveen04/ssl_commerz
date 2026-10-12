"use client";

import { useState } from "react";
import { API_BASE_URL, initiatePayment, type InitiateRequest } from "@/lib/api";

const initialForm: InitiateRequest = {
  total_amount: "100.00",
  currency: "BDT",
  cus_name: "John Doe",
  cus_email: "john@example.com",
  cus_add1: "House 1, Road 2",
  cus_city: "Dhaka",
  cus_postcode: "1000",
  cus_country: "Bangladesh",
  cus_phone: "01711111111",
  product_name: "Premium Plan",
  product_category: "General",
  product_profile: "general",
};

const CURRENCIES = ["BDT", "USD", "EUR", "SGD", "INR", "MYR"];

export default function CheckoutForm() {
  const [form, setForm] = useState<InitiateRequest>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof InitiateRequest>(key: K, value: InitiateRequest[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await initiatePayment(form);
      window.location.href = result.GatewayPageURL as string;
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="grid">
        <div className="field">
          <label htmlFor="total_amount">Amount</label>
          <input
            id="total_amount"
            type="number"
            min="10"
            max="500000"
            step="0.01"
            required
            value={form.total_amount}
            onChange={(e) => update("total_amount", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            value={form.currency}
            onChange={(e) => update("currency", e.target.value)}
          >
            {CURRENCIES.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="cus_name">Customer name</label>
          <input
            id="cus_name"
            required
            value={form.cus_name}
            onChange={(e) => update("cus_name", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="cus_email">Email</label>
          <input
            id="cus_email"
            type="email"
            required
            value={form.cus_email}
            onChange={(e) => update("cus_email", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="cus_phone">Phone</label>
          <input
            id="cus_phone"
            required
            value={form.cus_phone}
            onChange={(e) => update("cus_phone", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="cus_city">City</label>
          <input
            id="cus_city"
            value={form.cus_city}
            onChange={(e) => update("cus_city", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="cus_postcode">Postcode</label>
          <input
            id="cus_postcode"
            value={form.cus_postcode}
            onChange={(e) => update("cus_postcode", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="cus_country">Country</label>
          <input
            id="cus_country"
            value={form.cus_country}
            onChange={(e) => update("cus_country", e.target.value)}
          />
        </div>

        <div className="field full">
          <label htmlFor="cus_add1">Address</label>
          <input
            id="cus_add1"
            value={form.cus_add1}
            onChange={(e) => update("cus_add1", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="product_name">Product name</label>
          <input
            id="product_name"
            value={form.product_name}
            onChange={(e) => update("product_name", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="product_category">Product category</label>
          <input
            id="product_category"
            value={form.product_category}
            onChange={(e) => update("product_category", e.target.value)}
          />
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <button className="primary" type="submit" disabled={loading}>
        {loading ? "Creating session…" : "Pay with SSLCOMMERZ"}
      </button>

      <p className="muted" style={{ marginTop: 14, marginBottom: 0 }}>
        Backend: <code>{API_BASE_URL}</code>
      </p>
    </form>
  );
}
