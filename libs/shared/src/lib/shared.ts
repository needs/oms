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

export const buildingSchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
});

export const roomFullSchema = roomSchema.merge(z.object({
  building: buildingSchema,
}));

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
});

export const bookingFullSchema = bookingSchema.merge(z.object({
  room: roomFullSchema,
  collective: collectiveSchema,
}));

export const buildingFullSchema = buildingSchema.merge(z.object({
  rooms: z.array(roomSchema),
}));

export const apiRoomsResponseSchema = z.array(buildingFullSchema);
export const apiBookingsResponseSchema = z.array(bookingFullSchema);
export const apiBookingsLightResponseSchema = z.record(z.string(), z.number());
export const apiRequestsResponseSchema = z.array(bookingFullSchema);
