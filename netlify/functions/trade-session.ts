import type { Context, Config } from "@netlify/functions";
import { verifySession } from "./_shared/auth.js";

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  let body: Record<string, unknown>;
  let token: unknown;
  try {
    body = await req.json();
    ({ token } = body);
  } catch {
    return new Response(JSON.stringify({ valid: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (typeof token !== "string") {
    return new Response(JSON.stringify({ valid: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const session = verifySession(token);
  if (!session) {
    return new Response(JSON.stringify({ valid: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({ valid: true, businessName: session.businessName }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
};

export const config: Config = {
  method: ["POST"],
};
