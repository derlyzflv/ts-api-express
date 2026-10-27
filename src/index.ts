// https://github.com/derlyzflv/ts-api-express
import express from 'express';
import type{ Request, Response } from 'express';
import { NOMEM } from 'node:dns';
import estudiantesRouter from './routes/estudiantes.ts';

const app = express();
app.use(express.json());
app.use('/api/estudiantes', estudiantesRouter);



const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});