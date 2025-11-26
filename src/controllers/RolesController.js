import RolesService from '../services/RolesService.js';
import {
    createRoles,
    updateRoles,
} from '../models/RolesModel.js';
import { ZodError } from 'zod';
import { success, error } from '../utils/responseHandler.js'; 

class RolesController {
    async createRol(req, res) {
        try {
            const validatedData = createRoles.parse(req.body);
            const newRol = await RolesService.createRol(validatedData);
            
            success(req, res, newRol, 201);
        } catch (err) {
            if (err instanceof ZodError) {
                return error(req, res, { errors: err }, 400); 
            }
            if (err.message.includes('Rol con este nombre')) {
                return error(req, res, err.message, 409);
            }
            error(req, res, err.message, 500); 
        }
    }

    async getAllRoles(req, res) {
        try {
            const roles = await RolesService.getAllRoles();
            success(req, res, roles, 200);
        } catch (err) {
            error(req, res, err.message, 500);
        }
    }

    async getRolById(req, res) {
        try {
            const rol = await RolesService.getRolById(req.params.id);
            success(req, res, rol, 200);
        } catch (err) {
            if (err.message.includes('no encontrado')) {
                return error(req, res, err.message, 404);
            }
            error(req, res, err.message, 500);
        }
    }

    async patchRol(req, res) {
        try {
            const validatedData = updateRoles.parse(req.body);
            const updatedRol = await RolesService.updateRol(
                req.params.id,
                validatedData
            );
            success(req, res, updatedRol, 200);
        } catch (err) {
            if (err instanceof ZodError) {
                return error(req, res, { errors: err }, 400);
            }
            if (err.message.includes('no encontrado')) {
                return error(req, res, err.message, 404);
            }
            if (err.message.includes('Rol con este nombre')) {
                return error(req, res, err.message, 409); 
            }
            error(req, res, err.message, 500);
        }
    }

    async deleteRol(req, res) {
        try {
            await RolesService.deleteRol(req.params.id);
            success(req, res, '', 204);
        } catch (err) {
            if (err.message.includes('no encontrado')) {
                return error(req, res, err.message, 404);
            }
            error(req, res, err.message, 500);
        }
    }
}

export default new RolesController();