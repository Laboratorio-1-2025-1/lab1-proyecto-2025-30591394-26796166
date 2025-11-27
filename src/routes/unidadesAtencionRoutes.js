import express from "express"
import UnidadesAtencionController from "../controllers/UnidadesAtencionController.js"

const router = express.Router()

/**
 * @openapi
 * tags:
 * - name: Unidades
 * description: Operaciones sobre las unidades o sedes de atención
 */

/**
 * @openapi
 * /unidades:
 *   post:
 *     tags:
 *       - Unidades
 *     summary: Crear una nueva unidad de atención
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UnidadCreate'
 *     responses:
 *       '201':
 *         description: Unidad creada
 *       '400':
 *         description: Datos inválidos o faltantes
 *       '409':
 *         description: Conflicto (nombre duplicado)
 */
router.post("/", UnidadesAtencionController.createUnidad)

/**
 * @openapi
 * /unidades:
 *   get:
 *     tags:
 *       - Unidades
 *     summary: Obtener todas las unidades de atención
 *     responses:
 *       '200':
 *         description: Lista de unidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Unidad'
 */
router.get("/", UnidadesAtencionController.getAllUnidades)

/**
 * @openapi
 * /unidades/{id}:
 *   get:
 *     tags:
 *       - Unidades
 *     summary: Obtener una unidad por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Unidad encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unidad'
 *       '404':
 *         description: No encontrada
 */
router.get("/:id", UnidadesAtencionController.getUnidadById)

/**
 * @openapi
 * /unidades/{id}:
 *   patch:
 *     tags:
 *       - Unidades
 *     summary: Actualizar una unidad (parcial)
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
 *             $ref: '#/components/schemas/UnidadUpdate'
 *     responses:
 *       '200':
 *         description: Unidad actualizada
 *       '400':
 *         description: Datos inválidos
 *       '404':
 *         description: No encontrada
 */
router.patch("/:id", UnidadesAtencionController.patchUnidad)

/**
 * @openapi
 * /unidades/{id}:
 *   delete:
 *     tags:
 *       - Unidades
 *     summary: Eliminar una unidad por ID
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
 *         description: No encontrada
 */
router.delete("/:id", UnidadesAtencionController.deleteUnidad)

export default router
