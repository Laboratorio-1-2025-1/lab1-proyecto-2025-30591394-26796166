import express from "express"
import TratamientosController from "../controllers/TratamientosController.js"

const router = express.Router()

/**
 * @openapi
 * tags:
 * - name: Tratamientos
 * description: Operaciones sobre los tipos de tratamientos o servicios
 */

/**
 * @openapi
 * /tratamientos:
 *   post:
 *     tags:
 *       - Tratamientos
 *     summary: Crear un nuevo tratamiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TratamientoCreate'
 *     responses:
 *       '201':
 *         description: Tratamiento creado
 *       '400':
 *         description: Datos inválidos o faltantes
 *       '409':
 *         description: Conflicto (nombre duplicado)
 */
router.post("/", TratamientosController.createTratamiento)

/**
 * @openapi
 * /tratamientos:
 *   get:
 *     tags:
 *       - Tratamientos
 *     summary: Obtener todos los tratamientos
 *     responses:
 *       '200':
 *         description: Lista de tratamientos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tratamiento'
 */
router.get("/", TratamientosController.getAllTratamientos)

/**
 * @openapi
 * /tratamientos/{id}:
 *   get:
 *     tags:
 *       - Tratamientos
 *     summary: Obtener un tratamiento por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Tratamiento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tratamiento'
 *       '404':
 *         description: No encontrado
 */
router.get("/:id", TratamientosController.getTratamientoById)

/**
 * @openapi
 * /tratamientos/{id}:
 *   patch:
 *     tags:
 *       - Tratamientos
 *     summary: Actualizar un tratamiento (parcial)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TratamientoUpdate'
 *     responses:
 *       '200':
 *         description: Tratamiento actualizado
 *       '400':
 *         description: Datos inválidos
 *       '404':
 *         description: No encontrado
 *       '409':
 *         description: Conflicto (nombre duplicado)
 */
router.patch("/:id", TratamientosController.patchTratamiento)

/**
 * @openapi
 * /tratamientos/{id}:
 *   delete:
 *     tags:
 *       - Tratamientos
 *     summary: Eliminar un tratamiento por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Eliminado correctamente
 *       '404':
 *         description: No encontrado
 */
router.delete("/:id", TratamientosController.deleteTratamiento)

export default router
