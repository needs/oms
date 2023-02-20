/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { apiRoomsResponseSchema, schema } from '@oms-monorepo/shared';
import express from 'express';
import * as path from 'path';
import { z } from "zod";

const app = express();

const buildings = [
  {
    id: 1,
    name: 'Grolier',
    address: "Rue de la Paix, 69210 L'Arbresle",
    rooms: [
      {
        id: 1,
        name: 'Gymnase',
        description: 'Salle multi-sport',
        image: 'https://picsum.photos/200',
        capacity: 100,
      },
      {
        id: 2,
        name: 'Dojo',
        description: 'Art-martiaux',
        image: 'https://picsum.photos/201',
        capacity: 20,
      },
    ],
  },
  {
    id: 2,
    name: 'Grand-champs',
    address: 'Rue de la Paix, 69210 Sain-bel',
    rooms: [
      {
        id: 3,
        name: "Salle d'escalade",
        description: 'Escalade uniquement',
        image: 'https://picsum.photos/202',
        capacity: 20,
      },
      {
        id: 4,
        name: 'Salle de réunion',
        description: '10 tables, 20 chaises',
        image: 'https://picsum.photos/203',
        capacity: 20,
      },
      {
        id: 5,
        name: 'Gymnase multi-sports',
        description: 'Hauteur de plafond: 13m',
        image: 'https://picsum.photos/204',
        capacity: 100,
      },
    ],
  },
];

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  const result: z.infer<typeof schema> = { message: 'Welcome to server!' };
  res.send(result);
});

app.get('/rooms', (req, res) => {
  const result: z.infer<typeof apiRoomsResponseSchema> = buildings;
  res.send(result);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
