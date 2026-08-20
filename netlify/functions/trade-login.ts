// site/netlify/functions/trade-login.ts
import type { Context, Config } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { tradeAccounts } from "../../db/schema.js";
import { verifyPassword, signSession } from "./_shared/auth.js";

const INVALID = () =>
  new Response(JSON.stringify({ error: "Invalid email or password." }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  let email: unknown;
  let password: unknown;
  try {
    const body = await req.json();
    ({ email, password } = body);
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
  }

  if (typeof email !== "string" || typeof password !== "string") return INVALID();

  const [account] = await db
    .select()
    .from(tradeAccounts)
    .where(eq(tradeAccounts.email, email.trim().toLowerCase()))
    .limit(1);

  if (!account) return INVALID();

  const ok = await verifyPassword(password, account.passwordHash);
  if (!ok) return INVALID();

  const token = signSession({ sub: account.id, businessName: account.businessName });
  return new Response(
    JSON.stringify({ token, businessName: account.businessName }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
};

export const config: Config = {
  method: ["POST"],
};
