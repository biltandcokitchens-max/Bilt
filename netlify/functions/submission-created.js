/* Welcome email on every form submission.
 *
 * Netlify runs a function named `submission-created` automatically whenever
 * a Netlify Form is submitted - no wiring needed beyond the file name. This
 * one sends the enquirer a short welcome from hello@biltstudio.com.au via
 * Resend (https://resend.com), and a copy of the enquiry to the studio.
 *
 * Environment variables (Netlify UI -> Site configuration -> Environment):
 *   RESEND_API_KEY   from resend.com -> API Keys
 *   MAIL_FROM        e.g. "Bilt & Co <hello@biltstudio.com.au>" - the domain
 *                    must be verified in Resend (three DNS records) first
 *   MAIL_TO          where the studio copy goes; defaults to hello@biltstudio.com.au
 *
 * Nothing here can break a submission: Netlify has already stored it before
 * this runs, and a failure here is logged, not shown to the visitor.
 */

const SITE = 'https://biltstudio.com.au';
const PHONE = '0401 821 848';
const PHONE_HREF = '+61401821848';

const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function welcomeText(d) {
  const first = (d.name || '').trim().split(/\s+/)[0] || 'there';
  return `Hi ${first},

Thanks for sending your details through. Your enquiry has landed in the studio in Rockhampton and a person, not a call centre, will call you within one business day.

What happens next
1. We call you on ${d.phone || 'the number you gave'} to talk through the room and what you're after.
2. If you have them, send photos of each corner of the room and any plans to hello@biltstudio.com.au. Rough measurements are fine - our measuring guide shows what to record: ${SITE}/guide-how-to-measure-for-a-kitchen
3. You get a fixed, itemised quote. No deposit to see it, no showroom visit, no salesperson at your door.

Worth asking about: motorised pull-down overheads. Top shelves that come down to you at the touch of a button, fitted into standard overhead cabinets and quoted as a line item. ${SITE}/motorised-pull-down-shelving

Every kitchen is drawn to your room. It arrives delivered assembled - carcasses built, Blum hardware fitted, doors hung and adjusted - or flat packed if you'd rather build it. The quote shows both.

If it's quicker, call ${PHONE}.

Bilt & Co
Rockhampton, Queensland
${SITE}
`;
}

function welcomeHtml(d) {
  const first = esc((d.name || '').trim().split(/\s+/)[0] || 'there');
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f6efe1;font-family:Georgia,serif;color:#17140f">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6efe1;padding:32px 16px"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fffdf8;border:1px solid #e6dcc6">
  <tr><td style="background:#17140f;padding:22px 32px"><span style="font-size:22px;color:#f6efe1;letter-spacing:.02em">Bilt &amp; Co</span><br><span style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#c9a05a">Rockhampton</span></td></tr>
  <tr><td style="padding:0;line-height:0"><img src="${SITE}/assets/img/email-waterfall-island.jpg" width="560" alt="Calacatta stone island with a waterfall end, delivered assembled by Bilt &amp; Co" style="display:block;width:100%;max-width:560px;height:auto;border:0"></td></tr>
  <tr><td style="padding:32px 32px 8px">
    <p style="font-size:26px;line-height:1.15;margin:0 0 18px">Hi ${first},<br><em style="color:#9a7434">thanks for getting in touch.</em></p>
    <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;margin:0 0 16px">Your enquiry has landed in the studio in Rockhampton. A person, not a call centre, will call you within one business day.</p>
    <p style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#9a7434;margin:24px 0 8px">What happens next</p>
    <ol style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;margin:0 0 16px;padding-left:20px">
      <li style="margin-bottom:8px">We call you on <strong>${esc(d.phone || 'the number you gave')}</strong> to talk through the room and what you&rsquo;re after.</li>
      <li style="margin-bottom:8px">If you have them, reply with photos of each corner of the room and any plans. Rough measurements are fine &mdash; <a href="${SITE}/guide-how-to-measure-for-a-kitchen" style="color:#9a7434">our measuring guide</a> shows what to record.</li>
      <li>You get a fixed, itemised quote. No deposit to see it, no showroom visit, no salesperson at your door.</li>
    </ol>
    <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;margin:0 0 16px">Every kitchen is drawn to your room. It arrives <a href="${SITE}/assembled-kitchens" style="color:#9a7434">delivered assembled</a> &mdash; carcasses built, Blum hardware fitted, doors hung and adjusted &mdash; or <a href="${SITE}/flat-pack-kitchens" style="color:#9a7434">flat packed</a> if you&rsquo;d rather build it. The quote shows both.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 8px;border:1px solid #e6dcc6;background:#f6efe1"><tr><td style="padding:18px 20px">
      <p style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#9a7434;margin:0 0 6px">Worth asking about</p>
      <p style="font-size:19px;line-height:1.25;margin:0 0 8px">Motorised pull-down overheads.</p>
      <p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;margin:0">Top shelves that come down to you at the touch of a button, so the overhead cupboards stop being the storage nobody can reach. Fitted into standard overhead cabinets and quoted as a line item. <a href="${SITE}/motorised-pull-down-shelving" style="color:#9a7434">See how they work</a>.</p>
    </td></tr></table>
    <p style="margin:24px 0"><a href="tel:${PHONE_HREF}" style="display:inline-block;background:#17140f;color:#f6efe1;font-family:Arial,sans-serif;font-size:14px;padding:14px 22px;text-decoration:none">Quicker to talk? Call ${PHONE}</a></p>
  </td></tr>
  <tr><td style="padding:16px 32px 28px;border-top:1px solid #e6dcc6;font-family:Arial,sans-serif;font-size:12px;line-height:1.6;color:#7a7264">
    Bilt &amp; Co Pty Ltd &middot; Rockhampton, Queensland &middot; <a href="${SITE}" style="color:#9a7434">biltstudio.com.au</a><br>
    You are receiving this because you sent an enquiry through biltstudio.com.au. We never sell or share your details &mdash; <a href="${SITE}/privacy" style="color:#9a7434">privacy policy</a>.
  </td></tr>
</table></td></tr></table></body></html>`;
}

function studioText(d, meta) {
  const rows = Object.entries(d).filter(([k]) => !/^(bot-field|form-name)$/.test(k)).map(([k, v]) => `${k}: ${v}`).join('\n');
  return `New enquiry via ${meta.form || 'website form'}\n\n${rows}\n\nSubmitted: ${meta.created_at || new Date().toISOString()}\nReply to: ${d.email || '(no email given)'}\n`;
}

async function send(apiKey, msg) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(msg),
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`Resend ${res.status}: ${body}`);
  return body;
}

exports.handler = async (event) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM || 'Bilt & Co <hello@biltstudio.com.au>';
  const to = process.env.MAIL_TO || 'hello@biltstudio.com.au';
  if (!apiKey) {
    console.log('submission-created: RESEND_API_KEY not set, no email sent');
    return { statusCode: 200, body: 'skipped' };
  }

  let payload;
  try {
    payload = JSON.parse(event.body).payload;
  } catch (e) {
    console.error('submission-created: bad payload', e.message);
    return { statusCode: 200, body: 'ignored' };
  }
  const d = payload.data || {};
  const meta = { form: payload.form_name, created_at: payload.created_at };

  // Studio copy first - it is the one that must not be lost.
  try {
    await send(apiKey, {
      from, to,
      reply_to: d.email || undefined,
      subject: `Enquiry: ${d.name || 'unknown'}${d.suburb ? ' - ' + d.suburb : ''}`,
      text: studioText(d, meta),
    });
  } catch (e) {
    console.error('submission-created: studio copy failed', e.message);
  }

  if (!d.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) {
    console.log('submission-created: no usable email, welcome not sent');
    return { statusCode: 200, body: 'no-email' };
  }
  try {
    await send(apiKey, {
      from,
      to: d.email,
      reply_to: to,
      subject: 'Thanks - your kitchen enquiry has reached Bilt & Co',
      text: welcomeText(d),
      html: welcomeHtml(d),
    });
    console.log('submission-created: welcome sent to', d.email);
  } catch (e) {
    console.error('submission-created: welcome failed', e.message);
  }
  return { statusCode: 200, body: 'ok' };
};
