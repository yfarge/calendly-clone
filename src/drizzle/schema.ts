import { DAYS_OF_WEEK } from "@/data/constants";
import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  uuid,
  boolean,
  timestamp,
  index,
  pgEnum,
} from "drizzle-orm/pg-core";

const createdAt = timestamp("created_at").notNull().defaultNow();
const updatedAt = timestamp("updated_at")
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const EventTable = pgTable(
  "events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description"),
    duration: integer("duration_in_minutes").notNull(),
    clerkUserId: text("clerk_user_id").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    createdAt,
    updatedAt,
  },
  (table) => ({
    clerkUserIdIndex: index("clerk_user_id_index").on(table.clerkUserId),
  }),
);

export const ScheduleTable = pgTable("schedules", {
  id: uuid("id").primaryKey().defaultRandom(),
  timezone: text("timezone").notNull(),
  clerkUserId: uuid("clerk_user_id").notNull().unique(),
  createdAt,
  updatedAt,
});

export const scheduleRelations = relations(ScheduleTable, ({ many }) => ({
  availabilities: many(ScheduleAvailabilityTable),
}));

export const scheduleDayOfWeekEnum = pgEnum("day", DAYS_OF_WEEK);

export const ScheduleAvailabilityTable = pgTable(
  "schedule_availabilities",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    scheduleId: uuid("schedule_id")
      .notNull()
      .references(() => ScheduleTable.id, { onDelete: "cascade" }),
    startTime: text("start_time").notNull(),
    endTime: text("end_time").notNull(),
    dayOfWeek: scheduleDayOfWeekEnum("day_of_week").notNull(),
  },
  (table) => ({
    scheduleIdIndex: index("schedule_id_index").on(table.scheduleId),
  }),
);

export const scheduleAvailabilityRelations = relations(
  ScheduleAvailabilityTable,
  ({ one }) => ({
    schedule: one(ScheduleTable, {
      fields: [ScheduleAvailabilityTable.scheduleId],
      references: [ScheduleTable.id],
    }),
  }),
);
