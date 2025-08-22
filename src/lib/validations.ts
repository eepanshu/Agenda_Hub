
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const meetingSchema = z.object({
  title: z.string().min(1, "Meeting title is required").max(100, "Title too long"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  platform: z.enum(["google", "microsoft", "zoom"], {
    required_error: "Please select a platform",
  }),
  participants: z.string().optional(),
  agenda: z.string().max(500, "Agenda too long").optional(),
  recurrence: z.enum(["none", "daily", "weekly", "monthly"]).default("none"),
});

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  timezone: z.string().min(1, "Timezone is required"),
  notifications: z.boolean().default(true),
});

export const chatSchema = z.object({
  message: z.string().min(1, "Message cannot be empty").max(1000, "Message too long"),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type MeetingForm = z.infer<typeof meetingSchema>;
export type ProfileForm = z.infer<typeof profileSchema>;
export type ChatForm = z.infer<typeof chatSchema>;
