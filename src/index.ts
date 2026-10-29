// https://github.com/derlyzflv/ts-api-express
import express from 'express';
import type{ Request, Response } from 'express';
import { NOMEM } from 'node:dns';
import estudiantesRouter from './routes/estudiantes.ts';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './swagger_output.json' with { type: 'json' };

const app = express();
app.use(express.json());
app.use('/api/estudiantes', estudiantesRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});