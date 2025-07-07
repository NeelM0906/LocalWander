import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const stops = pgTable("stops", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  image_url: text("image_url"),
  walking_time_minutes: integer("walking_time_minutes").default(0),
});

export const itineraries = pgTable("itineraries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  duration_minutes: integer("duration_minutes").notNull(),
  location: text("location").notNull(),
  stops: json("stops").$type<number[]>().notNull(),
});

export const groundingChunks = pgTable("grounding_chunks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  snippet: text("snippet").notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertStopSchema = createInsertSchema(stops).omit({
  id: true,
});

export const insertItinerarySchema = createInsertSchema(itineraries).omit({
  id: true,
});

export const insertGroundingChunkSchema = createInsertSchema(groundingChunks).omit({
  id: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertStop = z.infer<typeof insertStopSchema>;
export type Stop = typeof stops.$inferSelect;

export type InsertItinerary = z.infer<typeof insertItinerarySchema>;
export type Itinerary = typeof itineraries.$inferSelect;

export type InsertGroundingChunk = z.infer<typeof insertGroundingChunkSchema>;
export type GroundingChunk = typeof groundingChunks.$inferSelect;
