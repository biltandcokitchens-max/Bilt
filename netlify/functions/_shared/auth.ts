import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = () => {
  const s = Netlify.env.get("TRADE_SESSION_SECRET");
  if (!s) throw new Error("TRADE_SESSION_SECRET is not set");
  return s;
};

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export interface SessionPayload {
  sub: string;
  businessName: string;
}

export function signSession(payload: SessionPayload): string {
  return jwt.sign(payload, SECRET(), { expiresIn: "30d" });
}

export function verifySession(token: string): SessionPayload | null {
  try {
    const decoded = jwt.verify(token, SECRET(), { algorithms: ["HS256"] });
    if (typeof decoded === "string") return null;
    const { sub, businessName } = decoded as Record<string, unknown>;
    if (typeof sub !== "string" || typeof businessName !== "string") return null;
    return { sub, businessName };
  } catch {
    return null;
  }
}
