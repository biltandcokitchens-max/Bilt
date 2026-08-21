-- One-time manual password reset, requested directly by the account owner
-- (buildxdirect@gmail.com forgot their password and needed immediate access
-- before the real forgot-password feature existed). New hash is bcrypt cost
-- 10, matching netlify/functions/_shared/auth.ts's hashPassword(). The
-- account owner is being given the plaintext temporary password separately
-- (never stored anywhere) and should change it once the reset flow ships.
UPDATE trade_accounts
SET password_hash = '$2a$10$tTHVKEwuCJ7kuDXbn0iXauTt3hSxXhpj./U8KAo24IMGhcVWSnpDK'
WHERE email = 'buildxdirect@gmail.com';
