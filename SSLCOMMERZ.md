# SSLCOMMERZ — Complete Deep-Research Documentation

> Compiled from official SSLCOMMERZ developer docs (v4), pricing/onboarding pages, SSL Wireless milestones, and independent comparisons. Figures are the provider's own published numbers as of the compile date; always confirm current rates, settlement terms, and store credentials with SSLCOMMERZ directly.

---

## 1. What SSLCOMMERZ Is

SSLCOMMERZ is **Bangladesh's first and largest online payment gateway / aggregator**, operated by **SSL Wireless**. It bundles cards, mobile financial services (MFS), and internet banking behind a **single integration**, letting merchants accept payments in BDT (and other currencies, auto-converted to BDT) on web and mobile.

- Positioned as the "No. 1 government-approved payment gateway in Bangladesh."
- Aggregator model: one API → VISA, Mastercard, AMEX, DBBL Nexus, bKash, Nagad, Rocket, QCash, Upay, and 15+ bank internet-banking channels.
- Backed by SSL Wireless, which has held a **Payment Systems Operator (PSO) licence** from Bangladesh Bank since 2016 and later received a **White Label Merchant Acquirer (WLMA)** NOC.

---

## 2. Company Background & History (SSL Wireless)

| Year | Milestone |
|------|-----------|
| 1999 | Founded as **Software Shop Limited** (Aptech franchisee, associated with Concorde Garments). |
| 2007 | Rebranded to **SSL Wireless**; pivoted to software dev + telecom VAS, then fintech. |
| 2008 | Launched Bangladesh's **first shortcode-based SMS banking platform**; IVR news services. |
| 2009 | First mobile banking application in Bangladesh; masked SMS; brought VeriSign to Bangladesh. |
| 2010 | **Launched SSLCOMMERZ** — the first online payment gateway in Bangladesh; mobile airtime recharge with a bank (2 MNOs). |
| 2011 | Launched `easy.com.bd`, the first online recharge platform; field-force automation. |
| 2012 | BPL e-ticketing; Virtual Recharge APIs for banks. |
| 2013 | Became largest acquirer of merchants/channels; MT subscription services. |
| 2015 | VISA partnership (5% bonus campaign); utility bill payment integrations. |
| 2016 | **PSO licence from Bangladesh Bank**; DESCO mobile app (first utility bill app). |
| 2017 | **PCI DSS v3.2 Level 1 Service Provider** certification; Card-on-File + QR payments (first in country). |
| 2018 | IoT lab / AI-ML capabilities; rebranded card-on-file as **Easy Checkout**; "Save & Save" with Visa; Mastercard + BASIS awards. |
| 2019 | **ISO 27001** certified. |
| 2020 | Appraised at **CMMI Level 3**. |
| 2021 | Launched **Bangla QR** (Bangladesh Bank's unified national QR). |
| 2022 | Received Bangladesh Bank NOC as **White Label Merchant Acquirer (WLMA)**. |

Company claims (vary by page/date): "**17,864+ businesses**" (About page) vs "3,500+ top e-commerce merchants" (older profile). Treat as a range.

---

## 3. Product & Feature Surface

- **Online Payment Gateway** — hosted, aggregated checkout.
- **Easy Checkout** — embedded / pop-up checkout that keeps customers on your UI (no full redirect).
- **Merchant Hosted Payment / Seamless** — full control of checkout page.
- **Invoice API** — generate an invoice QR + shareable payment link (SMS/Email/Messenger) for remote collection.
- **Bangla QR** — national standardized interoperable QR.
- **Google Pay™** — accept cards saved in a customer's Google Account (no extra cost).
- **QUICK BANK PAY Integration** — bank-specific quick pay.
- **EMI processing** — instalment options at the gateway or pre-selected on your site.
- **Card-on-File / tokenization** — saved-card reuse under Easy Checkout.
- **Fraud / risk engine** — returns `risk_level` (0 safe / 1 risky) on every transaction.
- **Campaigns engine** — merchant- and partner-run discounts by bank/card/wallet.
- **International payments** — cross-border card acceptance.
- **SecurePay mobile SDK layer** — device registration, OTP login, saved cards, EMI/offer lookups for native mobile apps.
- **Merchant Dashboard** (`merchant.sslcommerz.com`) — transactions, refunds, settlement & reconciliation reports, IPN settings, users/API keys.
- **Perfect for:** e-commerce, marketplaces, SaaS, ticketing, education, donation/charity, utility billing, travel/airline/telecom verticals.

---

## 4. Pricing (published)

**Basic plan**
- **One-time setup fee: ৳ 25,500** (non-refundable)
- **Transaction fee: 2.5% per successful transaction** (standard channels: Visa, Mastercard, bKash, Nagad, Rocket, etc.)
- **AMEX: 3.5%** per successful transaction
- Includes basic API integration + merchant dashboard access
- **No monthly fee** published
- Independent sources cite **settlement ~2–3 days** and **setup ~3–5 days** (not officially fixed by SSLCOMMERZ)

> Always request the written quote: ask about VAT on fees, international-card surcharge, refund/chargeback deductions, and any minimum/reserve — these are not published.

---

## 5. Supported Payment Channels

**Cards**
- VISA, Mastercard, AMEX, DBBL Nexus; brand- and bank-specific variants: brac_visa, brac_master, dbbl_visa, dbbl_master, city_visa, city_master, ebl_visa, ebl_master, sbl_visa, sbl_master, city_amex

**Mobile Financial Services (MFS) / wallets**
- bKash, Nagad, Rocket, QCash, Upay, DBBL Mobile Banking, Tap N Pay, Fast Cash

**Internet banking (IB)**
- City Touch, Bank Asia IB, IBBL, Mutual Trust Bank (MTBL), AB Bank IB, and more

**Group gateway keys** (for `multi_card_name` filtering)
- `internetbank` (all IB), `mobilebank` (all MFS), `othercard` (cards except Visa/MC/Amex), `visacard`, `mastercard`, `amexcard`

**Other**
- EMI, Google Pay, Bangla QR

---

## 6. Environments

| | Sandbox / Test | Live / Production |
|---|---|---|
| Base host | `https://sandbox.sslcommerz.com` | `https://securepay.sslcommerz.com` |
| Initiate API | `POST /gwprocess/v4/api.php` | `POST /gwprocess/v4/api.php` |
| Validate API | `GET /validator/api/validationserverAPI.php` | `GET /validator/api/validationserverAPI.php` |
| Refund/Query API | `GET /validator/api/merchantTransIDvalidationAPI.php` | `GET /validator/api/merchantTransIDvalidationAPI.php` |
| Invoice API | `POST /gwprocess/v4/invoice.php` | `POST /gwprocess/v4/invoice.php` |
| Invoice status/cancel | `POST /validator/api/v4/` | `POST /validator/api/v4/` |
| Sandbox register | `developer.sslcommerz.com/registration/` | `signup.sslcommerz.com/register` |
| Merchant panel | `sandbox.sslcommerz.com/manage/` | `merchant.sslcommerz.com` |
| Example store (docs) | `testbox` / `qwerty` | issued on live onboarding |

A newer sandbox doc host also exists: `https://sandbox-gw.sslcommerz.com/docs`.

**Test cards (sandbox)**
| Card | Number | Exp | CVV |
|---|---|---|---|
| VISA | 4111111111111111 | 12/26 | 111 |
| Mastercard | 5111111111111111 | 12/26 | 111 |
| AMEX | 371111111111111 | 12/26 | 111 |

**Mobile OTP:** `111111` or `123456`

---

## 7. Architecture & Payment Flow

Two integration styles, same backend flow:
1. **Easy Checkout** — embedded JS/widget inside your page.
2. **Hosted Payment** — redirect customer to SSLCOMMERZ hosted page.

**Three stages of backend integration:**

1. **Transaction Initiate** — your server POSTs order + customer data to `gwprocess/v4/api.php`; SSLCOMMERZ returns a **Session ID / sessionkey** and a **`GatewayPageURL`**. You redirect the customer there.
2. **Handling Payment Notification** — SSLCOMMERZ sends a server-to-server **IPN** (HTTP POST) to your configured `ipn_url`, and later redirects the customer to success/fail/cancel URLs. You must **re-validate** via the Order Validation API.
3. **Service Confirmation** — customer returns to your site; you show success/fail/cancel and update your DB.

> Rule: **always call SSLCOMMERZ APIs from your server**, never the browser — to prevent data tampering. HTTPS is mandatory (TLS 1.2+ only).

---

## 8. API Reference

### 8.1 Create & Get Session (Initiate Payment)
- **Endpoint:** `POST https://{sandbox|securepay}.sslcommerz.com/gwprocess/v4/api.php`
- **Content type:** form-urlencoded

**Key request parameters**

*Integration-required:*
| Param | Type | Notes |
|---|---|---|
| `store_id` | string(30) | Your Store ID (mandatory) |
| `store_passwd` | string(30) | Your Store Password (mandatory) |
| `total_amount` | decimal(10,2) | **10.00–500,000.00 BDT** |
| `currency` | string(3) | BDT, USD, EUR, SGD, INR, MYR… (non-BDT auto-converts to BDT) |
| `tran_id` | string(30) | Your **unique** order/transaction ID |
| `product_category` | string(50) | Open field |
| `success_url` / `fail_url` / `cancel_url` | string(255) | Callback URLs |
| `ipn_url` | string(255) | Optional but strongly recommended |

*Customer:* `cus_name`, `cus_email`, `cus_add1`, `cus_add2`, `cus_city`, `cus_state`, `cus_postcode`, `cus_country`, `cus_phone`, `cus_fax`

*Shipment:* `shipping_method` (YES/NO/Courier/SSLCOMMERZ_LOGISTIC), `num_of_item`, `weight_of_items`, plus `ship_*` fields and logistic fields (`logistic_pickup_id`, `logistic_delivery_type`, `ship_area`, `ship_sub_city`)

*Product:* `product_name`, `product_category`, `product_profile` (one of `general`, `physical-goods`, `non-physical-goods`, `airline-tickets`, `travel-vertical`, `telecom-vertical`), and vertical-specific fields (`hours_till_departure`, `flight_type`, `pnr`, `journey_from_to`, `third_party_booking`, `hotel_name`, `length_of_stay`, `check_in_time`, `hotel_city`, `product_type`, `topup_number`, `country_topup`)

*Cart/reconciliation:* `cart` (JSON array of `{sku, product, quantity, amount, unit_price}`), `product_amount`, `vat`, `discount_amount`, `convenience_fee`

*EMI:* `emi_option` (1/0), `emi_max_inst_option` (3/6/9), `emi_selected_inst`, `emi_allow_only`

*Control:* `multi_card_name` (comma-separated gateway keys), `allowed_bin`, `disallowed_bin`, `allowed_bin_msg`, `disallowed_bin_msg`

*Custom meta:* `value_a`, `value_b`, `value_c`, `value_d`

**Key response fields**
| Field | Meaning |
|---|---|
| `status` | `SUCCESS` or `FAILED` |
| `failedreason` | Reason if failed |
| `sessionkey` | Save this — used for later queries |
| `gw` | Active gateways by category |
| `GatewayPageURL` | **Redirect the customer here** |
| `redirectGatewayURL` | Direct-to-a-specific-gateway variant |
| `storeBanner`, `storeLogo` | Store assets |
| `desc` | Per-gateway name/type/logo |

**Example**
```
curl -X POST https://sandbox.sslcommerz.com/gwprocess/v4/api.php \
  -d 'store_id=testbox&store_passwd=qwerty&total_amount=100&currency=BDT&
      tran_id=REF123&success_url=...&fail_url=...&cancel_url=...&
      cus_name=...&cus_email=...&cus_city=Dhaka&cus_postcode=1000&
      cus_country=Bangladesh&cus_phone=01711111111&shipping_method=NO&
      product_name=Test&product_category=General&product_profile=general'
```

---

### 8.2 IPN (Instant Payment Notification)
SSLCOMMERZ POSTs transaction status to your `ipn_url` (server-to-server; no customer session).

**Status values:** `VALID`, `FAILED`, `CANCELLED`, `UNATTEMPTED`, `EXPIRED`

**Key POST fields:** `status`, `tran_date`, `tran_id`, `val_id`, `amount`, `store_amount`, `card_type`, `card_no`, `currency`, `bank_tran_id`, `card_issuer`, `card_brand`, `card_issuer_country`, `card_issuer_country_code`, `currency_type`, `currency_amount`, `value_a..d`, `risk_level`, `risk_title`, and the two validation keys `verify_sign` + `verify_key`.

**Hash (signature) validation (v3 style):**
1. Grab `verify_sign` and `verify_key`.
2. `verify_key` is a comma list of the parameters used to build the signature.
3. Sort those key names.
4. Append `store_passwd` to the list.
5. Build `key1=value1&key2=value2&...&store_passwd=MD5(YourStorePassword)`.
6. MD5 it and compare to `verify_sign`. (true = untampered)

> Do **not** trust the IPN alone — always confirm server-to-server via the Order Validation API before marking an order paid.

---

### 8.3 Order Validation API
- **Endpoint:** `GET https://{sandbox|securepay}.sslcommerz.com/validator/api/validationserverAPI.php`
- **Params:** `val_id`, `store_id`, `store_passwd`, `format` (json|xml), `v`

**Returned:** same field set as IPN. Extra `status` values:
- `VALID` — success
- `VALIDATED` — success but validated more than once
- `INVALID_TRANSACTION` — bad `val_id`

**Security checklist:** match `tran_id` against your DB; verify `amount`/`currency` match; check status before fulfilling.

---

### 8.4 Refund API
- **Initiate:** `GET .../validator/api/merchantTransIDvalidationAPI.php`
  - Params: `bank_tran_id`, `refund_trans_id` (unique; new since 2025-02-24), `store_id`, `store_passwd`, `refund_amount`, `refund_remarks`, optional `refe_id`, `format`
  - Returns: `APIConnect` (DONE/FAILED/INACTIVE/INVALID_REQUEST), `trans_id`, `refund_ref_id`, `status` (success/failed/processing), `errorReason`
- **Query refund status:** pass `refund_ref_id` + credentials
  - Returns `initiated_on`, `refunded_on`, `status` (`refunded`/`processing`/`cancelled`)
- **Security:** your public IP must be registered on the live system.

---

### 8.5 Transaction Query API
Same endpoint as Refund.
- **By session key:** `sessionkey`, `store_id`, `store_passwd` → status can also be `PENDING`
- **By transaction ID:** `tran_id`, `store_id`, `store_passwd` → returns `no_of_trans_found` + `element[]` (one entry per attempt, since one `tran_id` can have multiple tries)

**`APIConnect` values:** `DONE`, `FAILED`, `INACTIVE`, `INVALID_REQUEST`

---

### 8.6 Invoice API (QR + payment link)
- **Create:** `POST .../gwprocess/v4/invoice.php`
  - Extra mandatory params: `refer` (from your panel; sandbox `5B1F9DE4D82B6`), `acct_no`
  - Options: `is_sent_email` (yes/no), `is_sent_sms` (yes/no; requires isms.sslwireless.com), `is_bangla_qr_enabled` (YES/NO)
  - Returns: `pay_url` (shareable link), `qr_image_pay_url` (QR image), `invoice_id`, `email_sending_status`, `sms_sending_status`, `bangla_qr_code` (content string)
- **Status:** `POST .../validator/api/v4/` with `action=invoicePaymentStatus`, `refer`, `invoice_id` → `payment_status` ∈ `VALID`/`PENDING`/`FAILED`, plus `transaction` details
- **Cancel:** same endpoint, `action=invoiceCancellation` → `payment_status` `CANCELLED` (or `VALID` if already paid, so cancellation is rejected)

---

### 8.7 Google Pay™ Integration
- Free add-on; cards saved in Google Account.
- **Merchant Hosted Payment endpoint:** `POST https://<base-url>/api/v1/merchant-hosted-payment` with `action`:
  - `googlepayConfig` — returns `apiVersion`, `gatewayMerchantId`, `gateway`, `merchantId`, `merchantName`, `allowedAuthMethods`, `allowedCardNetworks` (**daily limit: 3 requests — cache it**)
  - `initiateTransaction` — returns `sessionkey`, `redirectGatewayURL`, and a `googlepay` object (`session_key`, `actionurl`)
- **Token submit:** `POST <actionurl>` with `session_key` + base64 `en_signature_data` → returns `otp` (3DS required) or `regular` type + `return_url`
- `allowedAuthMethods`: `PAN_ONLY` (3DS OTP) / `CRYPTOGRAM_3DS` (tap & pay); networks: MASTERCARD, VISA
- `user_refer` must be AES-256-CBC encrypted JSON `{user_refer, user_mobile}`; **sandbox salt key:** `F5d66a527ff181486321bf7c3s7f54de`; live key provided by SSLCOMMERZ
- Enable button on Hosted Checkout via `operation@sslwireless.com`; provide your Google Merchant ID.

---

### 8.8 SecurePay API (Mobile SDK)
Native-app counterpart to V4: endpoints under `/securepay/api.php/{action}` (`get_token`, `send_checkout_otp`, `verify_checkout_otp`, `login_status`, `mycards`, `get_emi`, `logoff`). Each requires a device `reg_id`/`enc_key` pair obtained from `get_token`.

---

## 9. Security & Compliance

- **PCI-DSS certified** (SSL Wireless held PCI DSS v3.2 Level 1 Service Provider; SSLCOMMERZ markets PCI-DSS compliance).
- **ISO 27001** (information security) and **CMMI Level 3** for SSL Wireless.
- **TLS 1.2+ only.** Verify: `curl "https://sandbox.sslcommerz.com/public/tls/" -v` → `TLS is okay`.
- **Server-side API calls only** (never expose store_passwd client-side).
- **IPN hash validation** (`verify_sign`/`verify_key`) + **Order Validation API** = mandatory double check.
- **Risk engine** returns `risk_level` (1 = hold service, collect verification docs).
- **IP whitelisting:** your IPN listener on ports 80/443 must be reachable; whitelist SSLCOMMERZ IPs.
  - Sandbox: open TCP 80/443 from `103.26.139.87`
  - Production: `103.26.139.81` & `103.132.153.81`; be able to reach TCP 443 of `103.26.139.148` & `103.132.153.148`
- Live refund/query requires your **public IP registered** on the live system.

---

## 10. Onboarding / KYC Requirements (by entity type)

Requirements differ by business structure; common core = **MEF** (Merchant Enrollment Form, signed & sealed), bank cheque leaf, signatory NID + photo, Trade Licence, TIN, VAT, and **DBID**.

| Entity | Key documents |
|---|---|
| Proprietorship | Trade Licence, TIN, MEF, VAT, DBID |
| Partnership | + Deed of Partnership, letter of authorization for signatory |
| Private Limited | MOA/AOA, COI, Form XII, CBR, RCBFI, Trade Licence, MEF, TIN, VAT, DBID |
| Public Limited | + same corporate set |
| Facebook Merchant | Contact, email, UBO NID + photo, digital signature, undertaking, DBID |
| NGO | NGO Bureau certificate, settlement clearance, trustees list |
| Trust | Trust Deed, RJSC/Social Welfare permit, trustees |
| Education / Alumni | EIIN, head/VC permission, board resolution, MoE certificate |
| Foundation/Charity/Association | Social Welfare/RJSC permit, trustees |
| Government / Defense | HoD letterhead letter, MEF |
| Diagnostic/Hospital | Ministry of Health cert, BMDC membership (colleges) |
| PEPs / Political Party | Source-of-fund letter, EC enlistment, NID/passport, TIN |
| Mosque | Waqf registration, committee resolution |

**Merchant checks:** blacklist screening, physical address verification, transaction-profile review, website review.

---

## 11. Integration Resources

- **Docs:** `developer.sslcommerz.com/doc/v4/`, `sandbox-gw.sslcommerz.com/docs`
- **Demo:** `dummypay.publicdemo.xyz`
- **GitHub org:** `github.com/sslcommerz` — official SDKs/plugins: PHP, Laravel, Python, JS, React, Next.js, Nest.js, jQuery, Flutter, Kotlin, Android, iOS, .NET, WordPress, Shopify, Magento, WooCommerce, OpenCart, WHMCS, ASP.NET, Java
- **Community:** `SSLCommerz-NodeJS`, `sslcommerz-sdk` (Python, readthedocs), various Next.js/Prisma examples
- **Postman:** no hosted collection; import the `curl` samples directly
- **Support:** `operation@sslwireless.com` (ops/Google Pay), plus a merchant KAM for production store IDs

---

## 12. Common Issues / Troubleshooting

- **Network:** IPN listener must use port 80/443 and be publicly reachable; whitelist SSLCOMMERZ IPs (see §9).
- **TLS:** must be 1.2+ or requests fail.
- **Amounts:** must be 10.00–500,000.00 BDT.
- **`tran_id` must be unique** across attempts.
- **Non-BDT currency** auto-converts to BDT → `amount` (BDT) differs from `currency_amount`; reconcile against both.
- **IPN missed** → rely on Transaction Query API by `sessionkey` or `tran_id` (statuses include `PENDING`).
- **`store_amount` < `amount`** because gateway/bank commission is deducted (docs example: 4% commission).
- **Risk payments** (`risk_level=1`) — decide whether to service.

---

## 13. Comparison with Alternatives (published figures)

| Gateway | Setup | Transaction | MFS | Settlement | Setup time | Best for |
|---|---|---|---|---|---|---|
| **SSLCOMMERZ** | ৳25,500 | ~2.5% (AMEX 3.5%) | 2.5% | ~2–3 days | 3–5 days | Large e-commerce, marketplaces, widest coverage |
| aamarPay | ৳4,000–20,000 | 2.55–3.25% card | 1.85–2.1% | ~2×/week | 2–4 days | Startups/SMB, low setup |
| ShurjoPay | ~৳10,000 | ~2.5% card | ~2% | not public | 3–7 days | Education/gov |
| PortPos (ex-PortWallet) | ৳0–20,000 + ৳24k/yr | ~2.5% + ৳1 | 2.2% | not public | 3–5 days | Developers/SaaS |
| bKash Merchant | Free | 1.5–2% | — | same/next day | 1–3 days | bKash-only shops |
| Nagad Merchant | Free | 1.5–2% | — | same day | 1–3 days | Nagad-only shops |
| 2Checkout / FastSpring | Free | 3.9%+ / 5.9%+ | — | — | instant | Global SaaS |

**Trade-off:** SSLCOMMERZ has the highest setup fee and a single flat rate, but the broadest channel coverage and the strongest brand/regulatory standing — best when you need one integration to accept "everything."

---

## 14. Quick-Start Checklist

1. Register a **sandbox** store (`developer.sslcommerz.com/registration/`) → receive `store_id` + `store_passwd`.
2. Configure **IPN URL** in the panel (My Store → IPN Settings → Enable HTTP Listener).
3. Implement **server-side** initiate call → get `GatewayPageURL` → redirect the customer.
4. Build the **IPN listener** (validate hash) + call **Order Validation API** → update your DB.
5. Test with sandbox cards; test refunds and queries.
6. Apply for **live** access (`signup.sslcommerz.com/register`) with your KYC documents; get live store ID; whitelist your public IP.
7. Swap base URLs to `securepay.sslcommerz.com` and ship.

---

## 15. Glossary

- **Store ID / Store Password** — your integration credentials (separate per environment).
- **Session ID / `sessionkey`** — identifies an initiated transaction for later queries.
- **`val_id`** — SSLCOMMERZ validation ID for a completed transaction.
- **`tran_id`** — your unique order ID.
- **`bank_tran_id`** — the bank-side transaction ID (needed for refunds).
- **IPN** — Instant Payment Notification (server-to-server status POST).
- **MFS** — Mobile Financial Services (bKash, Nagad, Rocket, etc.).
- **MEF** — Merchant Enrollment Form.
- **DBID** — Digital Business Identification.
- **PSO / WLMA** — Payment Systems Operator / White Label Merchant Acquirer (Bangladesh Bank licences).
- **Easy Checkout** — embedded/pop-up checkout keeping users on your UI.
- **Bangla QR** — national interoperable QR standard.

---

## 16. Sources

- [Integrate API — developer.sslcommerz.com/doc/v4](https://developer.sslcommerz.com/doc/v4/)
- [Developers v3.5 — developer.sslcommerz.com/docs.html](https://developer.sslcommerz.com/docs.html)
- [Sandbox Docs hub — sandbox-gw.sslcommerz.com/docs](https://sandbox-gw.sslcommerz.com/docs)
- [Invoice API — developer.sslcommerz.com/doc/v4/invoice.html](https://developer.sslcommerz.com/doc/v4/invoice.html)
- [Google Pay Integration — developer.sslcommerz.com/doc/v4/google-pay-integration.html](https://developer.sslcommerz.com/doc/v4/google-pay-integration.html)
- [Order Validation API — sandbox-gw.sslcommerz.com/doc/v4/order-validation.html](https://sandbox-gw.sslcommerz.com/doc/v4/order-validation.html)
- [Pricing — sslcommerz.com/pricing](https://sslcommerz.com/pricing/)
- [Payment Gateway — sslcommerz.com/payment-gateway](https://sslcommerz.com/payment-gateway/)
- [About Company — sslcommerz.com/about-company](https://sslcommerz.com/about-company/)
- [Onboarding Requirements — sslcommerz.com/onboarding-requirements](https://sslcommerz.com/onboarding-requirements/)
- [Milestones & Achievements — sslwireless.com/our-milestones](https://sslwireless.com/our-milestones)
- [Payment Gateways in Bangladesh: Fees & Comparison — deshistartup.com](https://deshistartup.com/en/payments/gateway-comparison)
- [Top 10 Payment Gateways in Bangladesh 2026 — bdigitic.com](https://bdigitic.com/best-payment-gateway-in-bangladesh/)
- [SSLCommerz-NodeJS Integration Guide — deepwiki.com](https://deepwiki.com/sslcommerz/SSLCommerz-NodeJS/5-integration-guide)
