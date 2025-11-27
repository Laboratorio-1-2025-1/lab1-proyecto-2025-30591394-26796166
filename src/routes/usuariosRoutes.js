import express from "express"
import UsuariosController from "../controllers/UsuariosController.js"

const router = express.Router()

/**
 * @openapi
 * tags:
 * - name: Usuarios
 * description: Gestión de usuarios del sistema (acceso, roles, credenciales)
 */

/**
 * @openapi
 * /usuarios:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Crear un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioCreate'
 *     responses:
 *       '201':
 *         description: Usuario creado
 *       '400':
 *         description: Datos inválidos (validación de contraseña, correo)
 *       '404':
 *         description: Rol ID no encontrado
 *       '409':
 *         description: Conflicto (correo duplicado)
 */
router.post("/", UsuariosController.createUsuario)

/**
 * @openapi
 * /usuarios:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener todos los usuarios (sin exponer la contraseña)
 *     responses:
 *       '200':
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
router.get("/", UsuariosController.getAllUsuarios)

/**
 * @openapi
 * /usuarios/{id}:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener un usuario por ID (sin exponer la contraseña)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       '404':
 *         description: No encontrado
 */
router.get("/:id", UsuariosController.getUsuarioById)

/**
 * @openapi
 * /usuarios/{id}:
 *   patch:
 *     tags:
 *       - Usuarios
 *     summary: Actualizar un usuario (parcialmente)
 *     description: Permite actualizar el correo, el ID del rol o la contraseña. La contraseña se hashea automáticamente.
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
 *             $ref: '#/components/schemas/UsuarioUpdate'
 *     responses:
 *       '200':
 *         description: Usuario actualizado
 *       '400':
 *         description: Datos inválidos
 *       '404':
 *         description: Usuario o Rol ID no encontrado
 */
router.patch("/:id", UsuariosController.patchUsuario)

/**
 * @openapi
 * /usuarios/{id}:
 *   delete:
 *     tags:
 *       - Usuarios
 *     summary: Eliminar un usuario por ID
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
router.delete("/:id", UsuariosController.deleteUsuario)

export default router
