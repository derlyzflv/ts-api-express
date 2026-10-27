// https://github.com/derlyzflv/ts-api-express
import express from 'express';
import type{ Request, Response } from 'node:os';
import { NOMEM } from 'node:dns';

const app = express();
app.use(express.json());

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];
let idNext : number = 1

app.get('/api/estudiantes', (req: Request, res: Response) => {
    res.status(200).json(estudiantes);
});

// {"nombre": "Mario", "email": "mario@gmail.com", "bootcamp": "frontend"}
// {nombre: 'Mario', email: 'mario@gmail.com', bootcamp: 'frontend'}
app.post('/api/estudiantes', (req: Request, res: Response) => {
    try {
        const { nombre, email, bootcamp } = req.body;
        if(!email){
            res.status(400).json({error: '400 Bad Request'});
            return
            }
            const estudiante : Estudiante = {
            id: idNext++,
            nombre: nombre,
            email: email,
            bootcamp: bootcamp
        }
        estudiantes.push(estudiante)
        res.status(201).json(estudiante);
    } catch {
        res.status(500).json({error: '500'})        
    }
});

app.put('/api/estudiantes/:id', (req: Request, res: Response) => {
    const indice = estudiantes.findIndex( e => e.id === Number(req.params.id));
    if (indice === -1) {
        res.status(404).json({error: '404 Not Found'})
        return
    }
    estudiantes[indice] = {...estudiantes[indice], ...req.body, id: estudiantes[indice]?.id};
    res.status(202).json(estudiantes[indice]);
});


app.delete('/api/estudiantes/:id', (req: Request, res: Response) => {
    const indice = estudiantes.findIndex( e => e.id === Number(req.params.id));
    if (indice === -1) {
        res.status(404).json({error: '404 Not Found'})
        return
    }
    const eliminado = estudiantes[indice]
    estudiantes.splice(indice, 1);
    res.status(201).json(eliminado);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});