import { Router } from 'express';
import { Router as RouterType, type Request, type Response } from 'express';

const router : RouterType = Router();

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [
  { id: 1, nombre: "Ana Torres", email: "ana.torres@example.com", bootcamp: "Frontend" },
  { id: 2, nombre: "Luis Mendoza", email: "luis.mendoza@example.com", bootcamp: "Backend" },
  { id: 3, nombre: "María Fernández", email: "maria.fernandez@example.com", bootcamp: "Frontend" },
  { id: 4, nombre: "Carlos Ramírez", email: "carlos.ramirez@example.com", bootcamp: "Backend" },
  { id: 5, nombre: "Lucía Vargas", email: "lucia.vargas@example.com", bootcamp: "Fullstack" },
  { id: 6, nombre: "Diego Castillo", email: "diego.castillo@example.com", bootcamp: "Backend" },
  { id: 7, nombre: "Sofía Herrera", email: "sofia.herrera@example.com", bootcamp: "Fullstack" },
  { id: 8, nombre: "Jorge Flores", email: "jorge.flores@example.com", bootcamp: "Backend" },
  { id: 9, nombre: "Valentina Rojas", email: "valentina.rojas@example.com", bootcamp: "Fullstack" },
  { id: 10, nombre: "Andrés Morales", email: "andres.morales@example.com", bootcamp: "Backend" },
];

let idNext : number = 11;

// /api/estudiantes?bootcamp=Frontend
router.get('/', (req: Request, res: Response) => {
    const bootcampFilter = req.query.bootcamp;
    if (!bootcampFilter) {
        res.status(200).json(estudiantes);
        return
    }
    if (typeof bootcampFilter !== 'string') {
        res.json({error: 'parametro bootcamp invalido'});
        return
    }
    res.status(200).json(estudiantes.filter(e => e.bootcamp === bootcampFilter));
});

router.get('/:id', (req: Request, res: Response) => {
    const indice = estudiantes.findIndex(e => e.id === Number(req.params.id));
    if (indice === -1) {
        res.status(404).json({error: '404 Not Found'});
        return
    }
    res.json(estudiantes[indice]);
});

// {"nombre": "Mario", "email": "mario@gmail.com", "bootcamp": "frontend"}
// {nombre: 'Mario', email: 'mario@gmail.com', bootcamp: 'frontend'}
router.post('/', (req: Request, res: Response) => {
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

router.put('/:id', (req: Request, res: Response) => {
    const indice = estudiantes.findIndex( e => e.id === Number(req.params.id));
    if (indice === -1) {
        res.status(404).json({error: '404 Not Found'})
        return
    }
    estudiantes[indice] = {...estudiantes[indice], ...req.body, id: estudiantes[indice]?.id};
    res.status(202).json(estudiantes[indice]);
});


router.delete('/:id', (req: Request, res: Response) => {
    const indice = estudiantes.findIndex( e => e.id === Number(req.params.id));
    if (indice === -1) {
        res.status(404).json({error: '404 Not Found'})
        return
    }
    const eliminado = estudiantes[indice]
    estudiantes.splice(indice, 1);
    res.status(201).json(eliminado);
}); 

export default router;
