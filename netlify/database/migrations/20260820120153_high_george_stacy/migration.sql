CREATE TABLE "trade_accounts" (
	"id" uuid PRIMARY KEY,
	"business_name" text NOT NULL,
	"abn" text NOT NULL,
	"website" text,
	"address" text NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"password_hash" text NOT NULL,
	"trade_type" text NOT NULL,
	"years_in_business" integer NOT NULL,
	"kitchens_per_year" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
