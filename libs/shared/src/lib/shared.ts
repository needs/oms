import { z } from "zod";

export const schema = z.object({
  message: z.string(),
});

export const roomSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  pictures: z.array(z.string().url()),
  capacity: z.number(),
});

export const collectiveSchema = z.object({
  fullName: z.string(),
  shortName: z.string(),
  logo: z.string().url().optional(),
});

export const bookingSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  start: z.coerce.date(),
  end: z.coerce.date(),
  numberOfPeople: z.number(),
  approved: z.boolean(),
  room: roomSchema,
  collective: collectiveSchema,
});

export const buildingSchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
  rooms: z.array(roomSchema),
});

export const apiRoomsResponseSchema = z.array(buildingSchema);
export const apiBookingsResponseSchema = z.array(bookingSchema);
