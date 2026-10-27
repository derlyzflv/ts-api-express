import express from 'express';

const app = express();

app.get('/api/status', (req: Request, res: Response) => {
    res.send({data:
        { "status": "Servidor en línea", "version": "1.0.0" }
    });
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});