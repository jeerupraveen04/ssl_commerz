import crypto from "crypto";

/**
 * SSLCOMMERZ IPN / validation signature check (v3 style).
 *
 * 1. Read verify_sign and verify_key from the payload.
 * 2. verify_key is a comma separated list of the parameter names used to build
 *    the signature.
 * 3. Sort those key names.
 * 4. Append store_passwd to the list (value = MD5 of the store password).
 * 5. Build key1=value1&key2=value2&...&store_passwd=MD5(YourStorePassword).
 * 6. MD5 the string and compare it with verify_sign.
 */
export function validateIpnSignature(
  payload: Record<string, string | undefined>,
  storePassword: string
): boolean {
  const verifySign = payload.verify_sign;
  const verifyKey = payload.verify_key;
  if (!verifySign || !verifyKey) {
    return false;
  }

  const keys = verifyKey
    .split(",")
    .map((key) => key.trim())
    .filter(Boolean)
    .sort();

  const parts = keys.map((key) => `${key}=${payload[key] ?? ""}`);
  const md5Password = crypto
    .createHash("md5")
    .update(storePassword)
    .digest("hex");
  parts.push(`store_passwd=${md5Password}`);

  const computed = crypto
    .createHash("md5")
    .update(parts.join("&"))
    .digest("hex");

  return computed.toLowerCase() === verifySign.toLowerCase();
}
