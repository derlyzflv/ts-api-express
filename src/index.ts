// https://github.com/derlyzflv/ts-api-express
import express from 'express';
import type { Request, Response } from 'express';
import { NOMEM } from 'node:dns';
import estudiantesRouter from './routes/estudiantes.ts';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './swagger_output.json' with { type: 'json' };
import cors from 'cors';
import type { CorsOptions } from 'cors';

const app = express();

// Conexiones a cualquier recurso 
// app.use(cors());
// Conexiones permitidas 
const allowedOrigins = ['https://test-your-mp2.netlify.app', 'http://localhost:3000', 'https://devtunnels.ms', 'http://localhost:5173', 'https://2flcbvwl-3000.brs.devtunnels.ms'];
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("Origen bloqueado por CORS:", origin);
      callback(new Error("Origen no permitido por CORS"))
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

// Ruta raíz para responder al test de conexión del frontend
app.get('/', (req, res) => {
  res.status(200).json({
    message: "¡API de Students Manager conectada con éxito!",
    status: "online"
  });
});

app.use('/api/students', estudiantesRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});