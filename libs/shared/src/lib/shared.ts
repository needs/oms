import { z } from "zod";

export const schema = z.object({
  message: z.string(),
});

export const roomSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  image: z.string().url(),
  capacity: z.number(),
});

export const buildingSchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
  rooms: z.array(roomSchema),
});

export const apiRoomsResponseSchema = z.array(buildingSchema);
