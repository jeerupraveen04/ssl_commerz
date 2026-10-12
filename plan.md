# SSLCOMMERZ API — Request Bodies & Responses (Detailed Reference)

Base hosts:
- **Sandbox:** `https://sandbox.sslcommerz.com` (also `https://sandbox-gw.sslcommerz.com`)
- **Live:** `https://securepay.sslcommerz.com`

All backend calls must be made **server-to-server** (never from the browser). TLS 1.2+ required.
Credentials: `store_id` + `store_passwd` (separate for sandbox and live).

---

## 1. Create & Get Session — Initiate Payment

- **Method/URL:** `POST {base}/gwprocess/v4/api.php`
- **Content-Type:** `application/x-www-form-urlencoded`

### 1.1 Request body

**Integration-required**

| Field | Type | Req | Body/Constraint |
|---|---|---|---|
| `store_id` | string(30) | yes | Your Store ID |
| `store_passwd` | string(30) | yes | Your Store Password |
| `total_amount` | decimal(10,2) | yes | 10.00 – 500000.00 BDT (e.g. `55.40`) |
| `currency` | string(3) | yes | `BDT`, `USD`, `EUR`, `SGD`, `INR`, `MYR`… non-BDT auto-converts to BDT |
| `tran_id` | string(30) | yes | Your unique order/transaction ID |
| `product_category` | string(50) | yes | Free text, e.g. `clothing`, `topup`, `donation` |
| `success_url` | string(255) | yes | Redirect after success |
| `fail_url` | string(255) | yes | Redirect after failure |
| `cancel_url` | string(255) | yes | Redirect after cancel |
| `ipn_url` | string(255) | rec | Server-to-server notification URL (optional but strongly recommended) |
| `multi_card_name` | string(30) | no | Comma list of gateway keys to control displayed channels |
| `allowed_bin` | string(255) | no | Comma list of allowed card BINs |

**EMI**

| Field | Type | Req | Notes |
|---|---|---|---|
| `emi_option` | int(1) | cond | `1`=offer EMI, `0`=no. Required if EMI-enabled |
| `emi_max_inst_option` | int(2) | no | Max instalments shown (3/6/9) |
| `emi_selected_inst` | int(2) | no | Pre-selected tenure (hides selection at gateway) |
| `emi_allow_only` | int(1) | no | `1`=only EMI possible on payment page |

**Customer information**

| Field | Type | Req | Notes |
|---|---|---|---|
| `cus_name` | string(50) | yes | Used in receipt email |
| `cus_email` | string(50) | yes | Receipt recipient |
| `cus_add1` | string(50) | yes | Address line 1 |
| `cus_add2` | string(50) | no | Address line 2 |
| `cus_city` | string(50) | yes | City |
| `cus_state` | string(50) | no | State |
| `cus_postcode` | string(30) | yes | Postcode |
| `cus_country` | string(50) | yes | Country |
| `cus_phone` | string(20) | yes | Phone (required for SSLCOMMERZ_LOGISTIC) |
| `cus_fax` | string(20) | no | Fax |

**Shipment**

| Field | Type | Req | Notes |
|---|---|---|---|
| `shipping_method` | string(50) | yes | `YES`/`NO`/`Courier`/`SSLCOMMERZ_LOGISTIC` |
| `num_of_item` | int(1) | yes | Items to ship (required for logistic) |
| `weight_of_items` | decimal(10,2) | yes | kg (required for logistic) |
| `logistic_pickup_id` | string(50) | yes | Logistic pickup ID (required for logistic) |
| `logistic_delivery_type` | string(50) | yes | Required for logistic |
| `ship_name` | string(50) | cond | Required if `shipping_method=YES` |
| `ship_add1` | string(50) | cond | Required if YES |
| `ship_add2` | string(50) | no | — |
| `ship_area` | string(50) | cond | Required if YES |
| `ship_city` | string(50) | cond | Required if YES |
| `ship_sub_city` | string(50) | cond | Thana/sub-district, required if YES |
| `ship_state` | string(50) | no | — |
| `ship_postcode` | string(50) | cond | Required if YES |
| `ship_country` | string(50) | cond | Required if YES |

**Product information**

| Field | Type | Req | Notes |
|---|---|---|---|
| `product_name` | string(255) | yes | Comma-separated names |
| `product_category` | string(100) | yes | e.g. `Electronic`, `topup` |
| `product_profile` | string(100) | yes | One of: `general`, `physical-goods`, `non-physical-goods`, `airline-tickets`, `travel-vertical`, `telecom-vertical` |
| `hours_till_departure` | string(30) | cond | airline-tickets |
| `flight_type` | string(30) | cond | `Oneway`/`Return`/`Multistop` (airline) |
| `pnr` | string(50) | cond | airline-tickets |
| `journey_from_to` | string(255) | cond | e.g. `DAC-CGP` (airline) |
| `third_party_booking` | string(20) | cond | `Yes`/`No` (airline) |
| `hotel_name` | string(255) | cond | travel-vertical |
| `length_of_stay` | string(30) | cond | travel-vertical |
| `check_in_time` | string(30) | cond | travel-vertical |
| `hotel_city` | string(50) | cond | travel-vertical |
| `product_type` | string(30) | cond | `Prepaid`/`Postpaid` (telecom) |
| `topup_number` | string(150) | cond | Mobile number(s) (telecom) |
| `country_topup` | string(30) | cond | telecom |
| `cart` | json | no | `[{"sku":"REF1","product":"Item","quantity":"1","amount":"200.00","unit_price":"200.00"}]` |
| `product_amount` | decimal(10,2) | no | For reconciliation |
| `vat` | decimal(10,2) | no | For reconciliation |
| `discount_amount` | decimal(10,2) | no | For reconciliation |
| `convenience_fee` | decimal(10,2) | no | For reconciliation |

**Custom meta**

| Field | Type | Req |
|---|---|---|
| `value_a` `value_b` `value_c` `value_d` | string(255) | no |

### 1.2 Response body

```json
{
  "status": "SUCCESS",
  "failedreason": "",
  "sessionkey": "F298BC45B0688E02768900C4F6B28C8B",
  "gw": {
    "visa": "dbbl_visa,brac_visa,city_visa,ebl_visa,visacard",
    "master": "dbbl_master,brac_master,city_master,ebl_master,mastercard",
    "amex": "city_amex,amexcard",
    "othercards": "dbbl_nexus,qcash,fastcash",
    "internetbanking": "city,bankasia,ibbl,mtbl",
    "mobilebanking": "dbblmobilebanking,bkash,abbank,ibbl"
  },
  "redirectGatewayURL": "https://sandbox.sslcommerz.com/gwprocess/v4/bankgw/indexhtml.php?...",
  "directPaymentURLBank": "...",
  "directPaymentURLCard": "",
  "directPaymentURL": "",
  "redirectGatewayURLFailed": "",
  "GatewayPageURL": "https://sandbox.sslcommerz.com/gwprocess/v4/gw.php?Q=PAY&SESSIONKEY=F298BC45B0688E02768900C4F6B28C8B",
  "storeBanner": "https://securepay.sslcommerz.com/testbox/stores/banners/easyv1.png",
  "storeLogo": "https://securepay.sslcommerz.com/testbox/stores/logos/logo_SCZ100197.jpg",
  "desc": [
    { "name": "VISA", "type": "visa", "logo": "...", "gw": "visacard", "r_flag": "1", "redirectGatewayURL": "..." }
  ],
  "is_direct_pay_enable": "1"
}
```

| Field | Type | Meaning |
|---|---|---|
| `status` | string(10) | `SUCCESS` or `FAILED` |
| `failedreason` | string(255) | Why it failed |
| `sessionkey` | string(50) | Save for later queries |
| `gw` | string | Active gateways grouped by type |
| `redirectGatewayURL` | string(255) | Direct-to-gateway URL (append gateway key) |
| `GatewayPageURL` | string(255) | **Redirect the customer here** |
| `storeBanner` / `storeLogo` | string(255) | Store assets |
| `desc` | array | Per-gateway name/type/logo/gw |
| `is_direct_pay_enable` | int(1) | Reserved |

---

## 2. IPN (Instant Payment Notification) — inbound to your server

SSLCOMMERZ **POSTs** to your `ipn_url`. Content-Type: form-urlencoded. Respond with any HTTP 200 + message.

### 2.1 Request body received

| Field | Type | Notes |
|---|---|---|
| `status` | string(20) | `VALID` / `FAILED` / `CANCELLED` / `UNATTEMPTED` / `EXPIRED` |
| `tran_date` | datetime | `2017-11-23 18:59:55` |
| `tran_id` | string(30) | Your ID — validate against DB |
| `val_id` | string(50) | Validation ID |
| `amount` | decimal(10,2) | Total amount (BDT after conversion) — validate |
| `store_amount` | decimal(10,2) | What you receive after bank charge |
| `card_type` | string(50) | Gateway name chosen |
| `card_no` | string(80) | Masked card / reference ID |
| `currency` | string(3) | Settlement currency |
| `bank_tran_id` | string(80) | Bank-side transaction ID |
| `card_issuer` | string(100) | Issuer bank |
| `card_brand` | string(30) | VISA / MASTER / AMEX / IB / MOBILE BANKING |
| `card_issuer_country` | string(50) | Issuer country |
| `card_issuer_country_code` | string(2) | ISO code |
| `currency_type` | string(3) | Currency sent at initiation |
| `currency_amount` | decimal(10,2) | Amount before BDT conversion |
| `currency_rate` | decimal | Conversion rate |
| `base_fair` | decimal | — |
| `value_a` `value_b` `value_c` `value_d` | string(255) | Echoed back |
| `verify_sign` | string(255) | Signature to validate |
| `verify_key` | string | Comma list of keys used in signature |
| `risk_level` | int(1) | `0` safe / `1` risky |
| `risk_title` | string(50) | `Safe` / `Not Safe` |

### 2.2 Example body

```
tran_id=5a16c68b23783&val_id=1711231900331kHP17lnrr9T8Gt&amount=100&
card_type=VISA-Dutch Bangla&store_amount=97&card_no=425272XXXXXX3456&
bank_tran_id=1711231900331S0R8atkhAZksmM&status=VALID&
tran_date=2017-11-23 18:59:55&currency=BDT&card_issuer=Standard Chartered Bank&
card_brand=VISA&card_issuer_country=Bangladesh&card_issuer_country_code=BD&
store_id=testbox&verify_sign=8070c0cefed9e629b01100d8a92afda2&
verify_key=amount,bank_tran_id,base_fair,card_brand,...,value_d&
currency_type=BDT&currency_amount=100.00&currency_rate=1.0000&base_fair=0.00&
value_a=ref001_A&value_b=ref002_B&value_c=ref003_C&value_d=ref004_D&
risk_level=0&risk_title=Safe
```

### 2.3 Signature validation

1. Read `verify_sign` and `verify_key`.
2. Split `verify_key` by `,` → list of returned parameter names.
3. Sort those names.
4. Append `store_passwd` to the list.
5. Build `key1=value1&key2=value2&...&store_passwd=MD5(YourStorePassword)`.
6. `MD5` the string; compare with `verify_sign`. Match = untampered.

### 2.4 Your response

Return HTTP 200 with any body, e.g. `OK`.

---

## 3. Order Validation API

- **Method/URL:** `GET {base}/validator/api/validationserverAPI.php`

### 3.1 Request (query string)

| Field | Type | Req | Notes |
|---|---|---|---|
| `val_id` | string(50) | yes | From IPN |
| `store_id` | string(30) | yes | — |
| `store_passwd` | string(30) | yes | — |
| `format` | string(10) | no | `json` (default) or `xml` |
| `v` | int(1) | no | Reserved |

```
GET /validator/api/validationserverAPI.php?val_id=1709162025351ElIuHtUtFReBwE&store_id=testbox&store_passwd=qwerty&format=json
```

### 3.2 Response body

```json
{
  "status": "VALIDATED",
  "tran_date": "2017-09-16 20:25:27",
  "tran_id": "SSLCZ_TEST_59bd349436a7b",
  "val_id": "1709162025351ElIuHtUtFReBwE",
  "amount": "103.00",
  "store_amount": "98.88",
  "currency": "BDT",
  "bank_tran_id": "1709162025350IvUOK8nCTb6Uan",
  "card_type": "VISA-Brac bank",
  "card_no": "455445XXXXXX4326",
  "card_issuer": "STANDARD CHARTERED BANK",
  "card_brand": "VISA",
  "card_issuer_country": "Bangladesh",
  "card_issuer_country_code": "BD",
  "currency_type": "BDT",
  "currency_amount": "103.00",
  "currency_rate": "1.0000",
  "base_fair": "0.00",
  "value_a": "ref001", "value_b": "", "value_c": "ref003", "value_d": "ref004",
  "emi_instalment": "0", "emi_amount": "0.00", "emi_description": "", "emi_issuer": "",
  "account_details": "",
  "risk_title": "Safe", "risk_level": "0",
  "APIConnect": "DONE",
  "validated_on": "2017-09-16 20:25:37",
  "gw_version": ""
}
```

| Field | Values |
|---|---|
| `status` | `VALID`, `VALIDATED` (already validated), `INVALID_TRANSACTION` (bad val_id) |
| `discount_amount` / `discount_percentage` / `discount_remarks` | Present when campaign discount applied |
| `APIConnect` | `DONE` |

---

## 4. Refund API

- **Method/URL:** `GET {base}/validator/api/merchantTransIDvalidationAPI.php`

### 4.1 Initiate refund — request

| Field | Type | Req | Notes |
|---|---|---|---|
| `bank_tran_id` | string(80) | yes | From the transaction |
| `refund_trans_id` | string(30) | yes | Your unique refund ID (added 2025-02-24) |
| `store_id` | string(30) | yes | — |
| `store_passwd` | string(30) | yes | — |
| `refund_amount` | decimal(10,2) | yes | Amount to return |
| `refund_remarks` | string(255) | yes | Reason |
| `refe_id` | string(50) | no | Your reconciliation reference |
| `format` | string(10) | no | `json`/`xml` |
| `v` | int(1) | no | Reserved |

```
GET /validator/api/merchantTransIDvalidationAPI.php?bank_tran_id=1709162345070ANJdZV8LyI4cMw&refund_trans_id=TRID0000000001&refund_amount=5.50&refund_remarks=Out%20of%20Stock&store_id=testbox&store_passwd=qwerty&v=1&format=json
```

### 4.2 Initiate refund — response

```json
{
  "APIConnect": "DONE",
  "bank_tran_id": "1709162345070ANJdZV8LyI4cMw",
  "trans_id": "SSLCZ_TEST_59bd635981a94",
  "refund_ref_id": "59bd63fea5455",
  "status": "success",
  "errorReason": ""
}
```

| Field | Values |
|---|---|
| `APIConnect` | `DONE`, `FAILED`, `INACTIVE`, `INVALID_REQUEST` |
| `status` | `success`, `failed`, `processing` (already initiated) |
| `refund_ref_id` | Use to query refund status |

### 4.3 Query refund status — request

`refund_ref_id`, `store_id`, `store_passwd` (+ `format`).

```
GET /validator/api/merchantTransIDvalidationAPI.php?refund_ref_id=59bd63fea5455&store_id=testbox&store_passwd=qwerty&format=json
```

### 4.4 Query refund status — response

```json
{
  "APIConnect": "DONE",
  "bank_tran_id": "1709162345070ANJdZV8LyI4cMw",
  "tran_id": "SSLCZ_TEST_59bd635981a94",
  "initiated_on": "2017-09-16 23:48:46",
  "refunded_on": "2017-09-17 08:53:51",
  "status": "refunded",
  "refund_ref_id": "59bd63fea5455"
}
```

| `status` | `refunded`, `processing`, `cancelled` |
|---|---|

---

## 5. Transaction Query API

- **Method/URL:** `GET {base}/validator/api/merchantTransIDvalidationAPI.php`

### 5.1 By session key — request

`sessionkey`, `store_id`, `store_passwd` (+ `format`).

```
GET /validator/api/merchantTransIDvalidationAPI.php?sessionkey=C3329C5E252DF44B323D9BAF47ACBCD9&store_id=testbox&store_passwd=qwerty&format=json
```

### 5.2 By session key — response

```json
{
  "status": "VALID",
  "sessionkey": "C3329C5E252DF44B323D9BAF47ACBCD9",
  "tran_date": "2017-09-20 23:37:56",
  "tran_id": "59C2A4F6432F8",
  "val_id": "1709202338060TUgLqWw1PgB4GA",
  "amount": "10.00",
  "store_amount": "9.6",
  "bank_tran_id": "1709202338061Ac2MhyeosVJmUh",
  "card_type": "VISA-Brac bank",
  "risk_title": "Safe", "risk_level": "0",
  "APIConnect": "DONE",
  "validated_on": "2017-09-20 23:38:07"
}
```

### 5.3 By transaction ID — request

`tran_id`, `store_id`, `store_passwd` (+ `format`).

```
GET /validator/api/merchantTransIDvalidationAPI.php?tran_id=59C2A4F6432F8&store_id=testbox&store_passwd=qwerty&format=json
```

### 5.4 By transaction ID — response

```json
{
  "APIConnect": "DONE",
  "no_of_trans_found": 5,
  "element": [
    {
      "val_id": "17092023365512Wr2jmzTG69nV6",
      "status": "VALIDATED",
      "validated_on": "2017-09-20 23:43:17",
      "currency_type": "USD", "currency_amount": "10.00", "currency_rate": "1.0000",
      "base_fair": "0.00",
      "value_a": "", "value_b": "", "value_c": "", "value_d": "",
      "tran_date": "2017-09-20 23:35:59",
      "tran_id": "59C2A4F6432F8",
      "amount": "10.00", "store_amount": "9.75",
      "bank_tran_id": "17092023365508TFa1fjTrvgIhz",
      "card_type": "VISA-City Bank",
      "risk_title": "Safe", "risk_level": "0",
      "currency": "BDT", "bank_gw": "City Bank",
      "card_no": "", "card_issuer": "", "card_brand": "",
      "card_issuer_country": "", "card_issuer_country_code": "",
      "gw_version": "3.00",
      "emi_instalment": "0", "emi_amount": "", "emi_description": "", "emi_issuer": "",
      "error": ""
    }
  ]
}
```

`status` (both query modes): `VALID`, `VALIDATED`, `PENDING`, `FAILED`. Each `element[]` also carries `error` (failure reason if any).

---

## 6. Invoice API (QR + Payment Link)

### 6.1 Create invoice

- **Method/URL:** `POST {base}/gwprocess/v4/invoice.php`
- **Content-Type:** form-urlencoded

**Request body** (same fields as §1 plus:)

| Field | Type | Req | Notes |
|---|---|---|---|
| `refer` | string(30) | yes | From panel; sandbox = `5B1F9DE4D82B6` |
| `acct_no` | string(50) | yes | Your invoice/reference ID |
| `total_amount` | decimal(10,2) | yes | 10.00 – 500000.00 BDT |
| `currency` | string(3) | yes | — |
| `tran_id` | string(30) | yes | — |
| `product_category` | string(50) | yes | — |
| `is_bangla_qr_enabled` | string(3) | no | `YES`/`NO` — needs business KAM approval for live |
| `is_sent_email` | string(3) | no | `yes`/`no` |
| `is_sent_sms` | string(3) | no | `yes`/`no` (requires isms.sslwireless.com) |
| `ipn_url` | string(255) | no | Recommended |
| Customer `cus_*`, shipment `ship_*`/`num_of_item`/`shipping_method` | — | yes/cond | See §1 |
| Product `product_name`/`product_category`/`product_profile` + vertical fields | — | yes/cond | See §1 |
| `cart`, `product_amount`, `vat`, `discount_amount`, `convenience_fee` | — | no | See §1 |
| `emi_option`, `emi_max_inst_option`, `emi_selected_inst`, `emi_allow_only` | — | cond | See §1 |
| `value_a..d` | string(255) | no | — |

**Example request**
```
POST https://sandbox.sslcommerz.com/gwprocess/v4/invoice.php
store_id=testbox&store_passwd=qwerty&refer=5B1F9DE4D82B6&acct_no=CUST_REF_01&
total_amount=100&currency=EUR&tran_id=REF123&cus_name=...&cus_email=...&
shipping_method=YES&product_name=topup&product_category=recharge&
product_profile=telecom-vertical&num_of_item=1
```

**Response body**
```json
{
  "status": "success",
  "error_reason": "",
  "invoice_refer": "5B1F9DE4D82B6",
  "pay_url": "https://sandbox.sslcommerz.com/gwprocess/v4/pay.php?refer=TEST-INV5F4A76D33255D",
  "qr_image_url": "",
  "qr_image_pay_url": "https://merchant.sslcommerz.com/web/images/generateQR.php?QR=...",
  "invoice_id": "TEST-INV5F4A76D33255D",
  "email_sending_status": "NO",
  "sms_sending_status": "NO",
  "bangla_qr_code": "0002010102120216402004..."
}
```

| Field | Meaning |
|---|---|
| `status` | `success` / `failed` |
| `pay_url` | Shareable payment link |
| `qr_image_pay_url` | QR image for invoice |
| `invoice_id` | Store for status checks |
| `bangla_qr_code` | Raw content to render Bangla QR |

### 6.2 Invoice payment status

- **Method/URL:** `POST {base}/validator/api/v4/`

**Request body**

| Field | Type | Req |
|---|---|---|
| `store_id` | string(30) | yes |
| `store_passwd` | string(30) | yes |
| `refer` | string(30) | yes |
| `invoice_id` | string(50) | yes |
| `action` | string(30) | yes — `invoicePaymentStatus` |

```
POST https://sandbox.sslcommerz.com/validator/api/v4/
store_id=testbox&store_passwd=qwerty&refer=5B1F9DE4D82B6&action=invoicePaymentStatus&invoice_id=TEST-INV5F5E8BA9345C8
```

**Response body**
```json
{
  "APIConnect": "DONE",
  "status": "success",
  "failedreason": "",
  "refer": "5B1F9DE4D82B6",
  "invoice_id": "TEST-INV5F5E8BA9345C8",
  "payment_status": "VALID",
  "transaction": { }
}
```

| Field | Values |
|---|---|
| `status` | `success` / `failed` |
| `payment_status` | `VALID`, `PENDING`, `FAILED` (expired) |
| `transaction` | Details of successful tx (same fields as §3) |

### 6.3 Invoice cancellation

Same endpoint; `action=invoiceCancellation`.

**Response**
```json
{
  "APIConnect": "DONE",
  "status": "success",
  "failedreason": "",
  "refer": "5B1F9DE4D82B6",
  "invoice_id": "TEST-INV5F5E8BA9345C8",
  "payment_status": "CANCELLED"
}
```

| `payment_status` | `VALID` (already paid → cancel rejected), `CANCELLED` (cancelled OK) |
|---|---|

---

## 7. Google Pay™ (Merchant Hosted Payment)

- **Method/URL:** `POST {base}/api/v1/merchant-hosted-payment`

### 7.1 Get Google Pay config — `action=googlepayConfig`

**Request**
```json
{ "action": "googlepayConfig", "store_id": "demotest", "store_passwd": "qwerty" }
```

**Response**
```json
{
  "APIConnect": "SUCCESS",
  "status_code": 200,
  "data": {
    "apiVersion": "2",
    "apiVersionMinor": "0",
    "gatewayMerchantId": "googletest2",
    "gateway": "sslcommerz",
    "merchantId": "01234567890123456789",
    "merchantName": "Example Merchant",
    "allowedAuthMethods": "PAN_ONLY,CRYPTOGRAM_3DS",
    "allowedCardNetworks": "MASTERCARD,VISA"
  }
}
```
> **Daily limit: 3 requests** — cache the config.

### 7.2 Initiate transaction — `action=initiateTransaction`

**Request body** (adds to standard initiate fields): `action`, `user_refer` (AES-256-CBC encrypted JSON, min 20 chars) **or** `enable_cus_googlepay=1`, `total_amount`, `currency`, `tran_id`, `success_url`, `fail_url`, `cancel_url`, `ipn_url`, `cus_*`, `shipping_method`, `ship_*`, `product_name`, `product_profile`, `cart`, `product_amount`, `vat`, `discount_amount`, `convenience_fee`, `value_a..d`, `allowed_bin`, `disallowed_bin`, `allowed_bin_msg`, `disallowed_bin_msg`.

**`user_refer` plaintext before encryption:** `{"user_refer":"ABCDEFGHIJ1234567890","user_mobile":"01XXXXXXXXX"}` (11-digit BD mobile).
**Sandbox salt key (AES):** `F5d66a527ff181486321bf7c3s7f54de`.

**Response**
```json
{
  "APIConnect": "SUCCESS",
  "status_code": 200,
  "data": {
    "sessionkey": "CA5B772D7E3553CB5B08A78068FF9E68",
    "redirectGatewayURL": "https://dev-epay-gw.sslcommerz.com/...",
    "googlepay": {
      "totalPrice": "100.00",
      "currencyCode": "BDT",
      "countryCode": "BD",
      "session_key": "yw7yeoy39y293c236446612232343434",
      "actionurl": "https://epay.sslcommerz.com/yw7yeoy39y293c23..."
    }
  }
}
```

### 7.3 Submit Google Pay token — `POST <actionurl>`

**Request**
```json
{ "session_key": "yw7yeoy39y293c236446612232343434", "en_signature_data": "eyJzaWduYXR1cmUiOiJNRVVDSVF..." }
```
(`en_signature_data` = base64 of the Google payload.)

**Response — 3DS required**
```json
{ "status": "SUCCESS", "message": "Payment Redirection.", "data": { "type": "otp", "data": "<form action='...threeDs' ...>", "return_url": "https://merchant.com/payment/success" } }
```
**Response — no 3DS**
```json
{ "status": "SUCCESS", "message": "Payment Redirection.", "data": { "type": "regular", "return_url": "https://merchant.com/payment/success" } }
```
Then redirect the customer to `return_url`.

---

## 8. SecurePay API (Mobile SDK)

- **URL pattern:** `{base}/securepay/api.php/{action}`
- **Actions:** `get_token`, `send_checkout_otp`, `verify_checkout_otp`, `login_status`, `mycards`, `get_emi`, `logoff`
- **Auth:** call `get_token` first → returns device `reg_id` + `enc_key`; supply both on subsequent actions.

---

## 9. Status Code Reference (all APIs)

| Enum | Appears in | Meaning |
|---|---|---|
| `SUCCESS` / `FAILED` | initiate, gpay | API connectivity |
| `VALID` | IPN, validate, query, invoice | Successful transaction |
| `VALIDATED` | validate, query | Success, called more than once |
| `PENDING` | query, invoice | Not completed yet |
| `FAILED` | IPN, query, invoice | Declined / expired |
| `CANCELLED` | IPN, invoice | Customer cancelled |
| `UNATTEMPTED` | IPN | No channel chosen |
| `EXPIRED` | IPN | Payment timeout |
| `INVALID_TRANSACTION` | validate | Bad `val_id` |
| `DONE` / `FAILED` / `INACTIVE` / `INVALID_REQUEST` | validator APIs (`APIConnect`) | Connection/auth status |
| `success` / `failed` / `processing` | refund | Refund initiation |
| `refunded` / `processing` / `cancelled` | refund query | Refund lifecycle |

---

## 10. Integration Sequence (what to send, what you get)

1. **You → Initiate** (`gwprocess/v4/api.php`) — full order/customer body → **get** `sessionkey` + `GatewayPageURL`.
2. **Redirect customer** to `GatewayPageURL`.
3. **SSLCOMMERZ → your IPN** (`ipn_url`) — POST status body with `verify_sign`.
4. **You → Order Validation** (`validationserverAPI.php?val_id=...`) — **get** authoritative `status`/`amount`.
5. **Update DB**, then show success/fail/cancel page on redirect.
6. Later: **Refund API** / **Transaction Query API** / **Invoice API** as needed.

---

## 11. Test Credentials (sandbox)

| Card | Number | Exp | CVV |
|---|---|---|---|
| VISA | `4111111111111111` | 12/26 | 111 |
| Mastercard | `5111111111111111` | 12/26 | 111 |
| AMEX | `371111111111111` | 12/26 | 111 |

Mobile OTP: `111111` or `123456` · Docs store: `testbox` / `qwerty` · Invoice `refer`: `5B1F9DE4D82B6`

---

## Sources
- [Integrate API v4](https://developer.sslcommerz.com/doc/v4/) · [v3.5](https://developer.sslcommerz.com/docs.html) · [Sandbox docs](https://sandbox-gw.sslcommerz.com/docs)
- [Invoice API](https://developer.sslcommerz.com/doc/v4/invoice.html) · [Google Pay](https://developer.sslcommerz.com/doc/v4/google-pay-integration.html)
- [Order Validation](https://sandbox-gw.sslcommerz.com/doc/v4/order-validation.html)
