/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { apiBookingsLightResponseSchema, apiBookingsResponseSchema, apiRequestsResponseSchema, apiRoomsResponseSchema, schema } from '@oms-monorepo/shared';
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
      rooms: true
    },
  });

  const result: z.infer<typeof apiRoomsResponseSchema> = buildings;
  res.send(result);
});

app.get('/bookings', async (req, res) => {
  const minDate = new Date(req.query.day.toString());
  minDate.setHours(0, 0, 0, 0);
  const maxDate = new Date(req.query.day.toString());
  maxDate.setHours(23, 59, 59, 999);

  const bookings = await prisma.booking.findMany({
    where: {
      roomId: req.query.roomId ? Number(req.query.roomId) : undefined,
      start: {
        gte: minDate,
        lte: maxDate,
      },
    },
    include: {
      room: {
        include: {
          building: true,
        },
      },
      collective: true,
    },
  });

  const result: z.infer<typeof apiBookingsResponseSchema> = bookings;
  res.send(result);
});

/* Super light call to return only what is needed to display all bookings in a
calendar view with markers. */
app.get('/bookingsLight', async (req, res) => {
  const bookings = await prisma.booking.findMany({
    where: {
      roomId: req.query.roomId ? Number(req.query.roomId) : undefined,
    },
    select: {
      start: true,
    },
  });

  const result: z.infer<typeof apiBookingsLightResponseSchema> = bookings.reduce((acc, booking) => {
    const date = booking.start.toISOString().split('T')[0];
    if (acc[date] === undefined) {
      acc[date] = 1;
    } else {
      acc[date] += 1;
    }
    return acc;
  }, {});

  res.send(result);
});

app.get('/requests', async (req, res) => {
  const bookings = await prisma.booking.findMany({
    where: {
      approved: false,
    },
    include: {
      collective: true,
      room: {
        include: {
          building: true,
        },
      }
    },
    take: 10,
  });

  console.log(bookings);

  const result: z.infer<typeof apiRequestsResponseSchema> = bookings;

  res.send(result);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
