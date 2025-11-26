import express from 'express';
import CitasController from '../controllers/CitasController.js'; 

const router = express.Router();

/**
 * @openapi
 * tags:
 * - name: Citas
 * description: Gestión de citas, la entidad transaccional principal
 */

/**
 * @openapi
 * /citas:
 * post:
 * tags: [Citas]
 * summary: Crear una nueva cita
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/CitaCreate'
 * responses:
 * 201:
 * description: Cita creada
 * 400:
 * description: Datos inválidos
 * 404:
 * description: Paciente, Profesional o Unidad no encontrada (FK error)
 * 409:
 * description: Conflicto de horario para el profesional
 */
router.post('/', CitasController.createCita);

/**
 * @openapi
 * /citas:
 * get:
 * tags: [Citas]
 * summary: Obtener todas las citas (incluye relaciones)
 * responses:
 * 200:
 * description: Lista de citas
 */
router.get('/', CitasController.getAllCitas);

/**
 * @openapi
 * /citas/{id}:
 * get:
 * tags: [Citas]
 * summary: Obtener una cita por ID
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Cita encontrada
 * 404:
 * description: No encontrada
 */
router.get('/:id', CitasController.getCitaById);

/**
 * @openapi
 * /citas/{id}:
 * patch:
 * tags: [Citas]
 * summary: Actualizar una cita (parcial)
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/CitaUpdate'
 * responses:
 * 200:
 * description: Cita actualizada
 * 400:
 * description: Datos inválidos
 * 404:
 * description: Cita o dependencia no encontrada
 */
router.patch('/:id', CitasController.patchCita);

/**
 * @openapi
 * /citas/{id}:
 * delete:
 * tags: [Citas]
 * summary: Eliminar una cita por ID
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 204:
 * description: Eliminado correctamente
 * 404:
 * description: No encontrada
 */
router.delete('/:id', CitasController.deleteCita);

export default router;