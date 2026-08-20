/* ------------------------------------------------------------------
   trade-auth.js  ·  trade account signup/login/session, client side
   ------------------------------------------------------------------ */

export const TRADE_SESSION_KEY = 'bilt.trade.session';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

async function postJSON(path, body) {
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  } catch (e) {
    return { ok: false, status: 0, data: { error: "Trade accounts aren't available right now." } };
  }
}

export async function checkTradeSession() {
  const token = localStorage.getItem(TRADE_SESSION_KEY);
  if (!token) return { valid: false };
  const { ok, data } = await postJSON('/.netlify/functions/trade-session', { token });
  if (!ok || !data.valid) {
    localStorage.removeItem(TRADE_SESSION_KEY);
    return { valid: false };
  }
  return { valid: true, businessName: data.businessName };
}

export async function submitTradeSignup(fields) {
  const { ok, data } = await postJSON('/.netlify/functions/trade-signup', fields);
  if (!ok) return { ok: false, error: data.error || 'Something went wrong. Try again.' };
  localStorage.setItem(TRADE_SESSION_KEY, data.token);
  return { ok: true, businessName: data.businessName };
}

export async function submitTradeLogin(email, password) {
  const { ok, data } = await postJSON('/.netlify/functions/trade-login', { email, password });
  if (!ok) return { ok: false, error: data.error || 'Something went wrong. Try again.' };
  localStorage.setItem(TRADE_SESSION_KEY, data.token);
  return { ok: true, businessName: data.businessName };
}

export function tradeLogout() {
  localStorage.removeItem(TRADE_SESSION_KEY);
}

export function viewTradeLogin() {
  return `
  <div class="wrap-narrow">
    <h1>Trade login</h1>
    <p class="dimtx">Log in to see trade pricing.</p>
    <form id="tradeLoginForm" novalidate>
      <div class="field"><label for="tlEmail">Email</label><input id="tlEmail" name="email" type="email" required></div>
      <div class="field"><label for="tlPassword">Password</label><input id="tlPassword" name="password" type="password" required></div>
      <p id="tradeAuthErr" class="field-err" hidden></p>
      <button class="btn btn-pri" type="submit">Log in</button>
    </form>
    <p class="dimtx" style="margin-top:14px">New trade account? <a href="#/trade-signup">Sign up</a></p>
  </div>`;
}

export function viewTradeSignup() {
  return `
  <div class="wrap-narrow">
    <h1>Trade account signup</h1>
    <p class="dimtx">Tell us about your business — your account activates immediately, no waiting.</p>
    <form id="tradeSignupForm" novalidate>
      <div class="field"><label for="tsBusinessName">Business name</label><input id="tsBusinessName" name="businessName" type="text" required></div>
      <div class="field"><label for="tsAbn">ABN</label><input id="tsAbn" name="abn" type="text" inputmode="numeric" placeholder="11 digits" required></div>
      <div class="field"><label for="tsWebsite">Website (optional)</label><input id="tsWebsite" name="website" type="text"></div>
      <div class="field"><label for="tsAddress">Business address</label><input id="tsAddress" name="address" type="text" required></div>
      <div class="field"><label for="tsPhone">Phone</label><input id="tsPhone" name="phone" type="tel" required></div>
      <div class="field"><label for="tsEmail">Email</label><input id="tsEmail" name="email" type="email" required></div>
      <div class="field"><label for="tsPassword">Password</label><input id="tsPassword" name="password" type="password" minlength="8" required></div>
      <div class="field"><label for="tsTradeType">Trade type</label>
        <select id="tsTradeType" name="tradeType" required>
          <option value="">Select one</option>
          <option value="builder">Builder</option>
          <option value="cabinetmaker">Cabinetmaker</option>
          <option value="renovator">Renovator</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="field"><label for="tsYears">Years in business</label><input id="tsYears" name="yearsInBusiness" type="number" min="0" step="1" required></div>
      <div class="field"><label for="tsKitchens">Roughly how many kitchens a year?</label><input id="tsKitchens" name="kitchensPerYear" type="number" min="0" step="1" required></div>
      <p id="tradeAuthErr" class="field-err" hidden></p>
      <button class="btn btn-pri" type="submit">Create trade account</button>
    </form>
    <p class="dimtx" style="margin-top:14px">Already have an account? <a href="#/trade-login">Log in</a></p>
  </div>`;
}
