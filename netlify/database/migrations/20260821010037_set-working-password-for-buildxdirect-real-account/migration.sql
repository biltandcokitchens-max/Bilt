-- Corrects the account for buildxdirect@gmail.com. Debugging (see prior
-- migration 20260821004903) established that this account never actually
-- existed in production before today -- the owner's original signup was
-- silently blocked the whole time by the project's Netlify access-control
-- setting (fixed earlier today), not a forgotten password. A diagnostic
-- duplicate-email check then created the real row with placeholder business
-- details (businessName/abn/address/phone/tradeType/years/kitchens were all
-- test placeholders, password was a throwaway diagnostic value). This sets
-- the same known temporary password used elsewhere this session so the
-- owner has working access; the placeholder business fields still need to
-- be corrected with their real details (no profile-edit UI exists yet to
-- do that from the app itself).
UPDATE trade_accounts
SET password_hash = '$2a$10$tTHVKEwuCJ7kuDXbn0iXauTt3hSxXhpj./U8KAo24IMGhcVWSnpDK'
WHERE email = 'buildxdirect@gmail.com';
