/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { apiBookingsResponseSchema, apiRoomsResponseSchema, schema } from '@oms-monorepo/shared';
import express from 'express';
import * as path from 'path';
import { z } from "zod";
import { PrismaClient } from '@prisma/client'

const app = express();

const prisma = new PrismaClient()

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  const result: z.infer<typeof schema> = { message: 'Welcome to server!' };
  res.send(result);
});

app.get('/rooms', async (req, res) => {
  const buildings = await prisma.building.findMany({
    include: {
      rooms: true,
    },
  });

  const result: z.infer<typeof apiRoomsResponseSchema> = buildings;
  res.send(result);
});

app.get('/bookings', async (req, res) => {
  const bookings = await prisma.booking.findMany({
    where: {
      roomId: req.query.roomId ? Number(req.query.roomId) : undefined,
    },
    include: {
      room: true,
      collective: true,
    },
  });

  const result: z.infer<typeof apiBookingsResponseSchema> = bookings;
  res.send(result);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
