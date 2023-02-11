/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { schema } from '@oms-monorepo/shared';
import express from 'express';
import * as path from 'path';
import { z } from "zod";

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  const result: z.infer<typeof schema> = { message: 'Welcome to server!' };
  res.send(result);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
