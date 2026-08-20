// site/netlify/functions/trade-signup.ts
import type { Context, Config } from "@netlify/functions";
import { randomUUID } from "node:crypto";
import { db } from "../../db/index.js";
import { tradeAccounts } from "../../db/schema.js";
import { hashPassword, signSession } from "./_shared/auth.js";

const TRADE_TYPES = new Set(["builder", "cabinetmaker", "renovator", "other"]);

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
  }

  const {
    businessName, abn, website, address, phone, email, password,
    tradeType, yearsInBusiness, kitchensPerYear,
  } = body;

  if (!isNonEmptyString(businessName)) return badRequest("Business name is required.");
  if (!isNonEmptyString(abn) || !/^\d{11}$/.test(abn.replace(/\s/g, ""))) {
    return badRequest("ABN must be 11 digits.");
  }
  if (!isNonEmptyString(address)) return badRequest("Address is required.");
  if (!isNonEmptyString(phone)) return badRequest("Phone number is required.");
  if (!isNonEmptyString(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return badRequest("A valid email is required.");
  }
  if (!isNonEmptyString(password) || password.length < 8) {
    return badRequest("Password must be at least 8 characters.");
  }
  if (typeof tradeType !== "string" || !TRADE_TYPES.has(tradeType)) {
    return badRequest("Trade type must be one of: builder, cabinetmaker, renovator, other.");
  }
  if (!Number.isInteger(yearsInBusiness) || (yearsInBusiness as number) < 0) {
    return badRequest("Years in business must be a whole number, 0 or more.");
  }
  if (!Number.isInteger(kitchensPerYear) || (kitchensPerYear as number) < 0) {
    return badRequest("Kitchens per year must be a whole number, 0 or more.");
  }

  const passwordHash = await hashPassword(password);
  const id = randomUUID();

  try {
    await db.insert(tradeAccounts).values({
      id,
      businessName: businessName.trim(),
      abn: abn.replace(/\s/g, ""),
      website: isNonEmptyString(website) ? website.trim() : null,
      address: address.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
      tradeType,
      yearsInBusiness,
      kitchensPerYear,
    });
  } catch (err) {
    const cause = err instanceof Error && err.cause instanceof Error ? err.cause : undefined;
    const message = `${err instanceof Error ? err.message : String(err)} ${cause?.message ?? ""}`.toLowerCase();
    if (message.includes("unique") || message.includes("duplicate")) {
      return new Response(
        JSON.stringify({ error: "An account with this email already exists." }),
        { status: 409, headers: { "Content-Type": "application/json" } },
      );
    }
    throw err;
  }

  const token = signSession({ sub: id, businessName: businessName.trim() });
  return new Response(
    JSON.stringify({ token, businessName: businessName.trim() }),
    { status: 201, headers: { "Content-Type": "application/json" } },
  );
};

function badRequest(message: string): Response {
  return new Response(JSON.stringify({ error: message }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}

export const config: Config = {
  method: ["POST"],
};
