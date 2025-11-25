import express from 'express';
import RolesController from '../controllers/RolesController.js'; 

const router = express.Router();

/**
 * @openapi
 * tags:
 * - name: Roles
 * description: Gestión de roles de usuario (Admin, Profesional, etc.)
 */

/**
 * @openapi
 * /roles:
 * post:
 * tags: [Roles]
 * summary: Crear un nuevo rol
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/RolCreate'
 * responses:
 * 201:
 * description: Rol creado
 * 400:
 * description: Datos inválidos o faltantes
 * 409:
 * description: Conflicto (nombre duplicado)
 */
router.post('/', RolesController.createRol);

/**
 * @openapi
 * /roles:
 * get:
 * tags: [Roles]
 * summary: Obtener todos los roles
 * responses:
 * 200:
 * description: Lista de roles
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Rol'
 */
router.get('/', RolesController.getAllRoles);

/**
 * @openapi
 * /roles/{id}:
 * get:
 * tags: [Roles]
 * summary: Obtener un rol por ID
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Rol encontrado
 * 404:
 * description: No encontrado
 */
router.get('/:id', RolesController.getRolById);

/**
 * @openapi
 * /roles/{id}:
 * patch:
 * tags: [Roles]
 * summary: Actualizar un rol (parcial)
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
 * $ref: '#/components/schemas/RolUpdate'
 * responses:
 * 200:
 * description: Rol actualizado
 * 400:
 * description: Datos inválidos
 * 404:
 * description: No encontrado
 * 409:
 * description: Conflicto (nombre duplicado)
 */
router.patch('/:id', RolesController.patchRol);

/**
 * @openapi
 * /roles/{id}:
 * delete:
 * tags: [Roles]
 * summary: Eliminar un rol por ID
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
 * description: No encontrado
 */
router.delete('/:id', RolesController.deleteRol);

export default router;