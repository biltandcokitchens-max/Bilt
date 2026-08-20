// site/db/schema.ts
import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";

export const tradeAccounts = pgTable("trade_accounts", {
  id: uuid().primaryKey(),
  businessName: text("business_name").notNull(),
  abn: text().notNull(),
  website: text(),
  address: text().notNull(),
  phone: text().notNull(),
  email: text().notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  tradeType: text("trade_type").notNull(),
  yearsInBusiness: integer("years_in_business").notNull(),
  kitchensPerYear: integer("kitchens_per_year").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type TradeAccount = typeof tradeAccounts.$inferSelect;
export type NewTradeAccount = typeof tradeAccounts.$inferInsert;
