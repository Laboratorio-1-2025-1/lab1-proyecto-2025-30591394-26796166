import UnidadesAtencionService from '../services/UnidadesAtencionService.js';
import {
    createUnidadesAtencion,
    updateUnidadesAtencion,
} from '../models/UnidadesAtencionModel.js';
import { ZodError } from 'zod';
import { success, error } from '../utils/responseHandler.js'; 

class UnidadesAtencionController {
    async createUnidad(req, res) {
        try {
            const validatedData = createUnidadesAtencion.parse(req.body);
            const newUnidad = await UnidadesAtencionService.createUnidad(validatedData);
            
            success(req, res, newUnidad, 201);
        } catch (err) {
            if (err instanceof ZodError) {
                return error(req, res, { errors: err }, 400); 
            }
            if (err.message.includes('Unidad de Atención con este nombre')) {
                return error(req, res, err.message, 409);
            }
            error(req, res, err.message, 500); 
        }
    }

    async getAllUnidades(req, res) {
        try {
            const unidades = await UnidadesAtencionService.getAllUnidades();
            success(req, res, unidades, 200);
        } catch (err) {
            error(req, res, err.message, 500);
        }
    }

    async getUnidadById(req, res) {
        try {
            const unidad = await UnidadesAtencionService.getUnidadById(req.params.id);
            success(req, res, unidad, 200);
        } catch (err) {
            if (err.message.includes('no encontrada')) {
                return error(req, res, err.message, 404);
            }
            error(req, res, err.message, 500);
        }
    }

    async patchUnidad(req, res) {
        try {
            const validatedData = updateUnidadesAtencion.parse(req.body);
            const updatedUnidad = await UnidadesAtencionService.updateUnidad(
                req.params.id,
                validatedData
            );
            success(req, res, updatedUnidad, 200);
        } catch (err) {
            if (err instanceof ZodError) {
                return error(req, res, { errors: err }, 400);
            }
            if (err.message.includes('no encontrada')) {
                return error(req, res, err.message, 404);
            }
            error(req, res, err.message, 500);
        }
    }

    async deleteUnidad(req, res) {
        try {
            await UnidadesAtencionService.deleteUnidad(req.params.id);
            success(req, res, '', 204);
        } catch (err) {
            if (err.message.includes('no encontrada')) {
                return error(req, res, err.message, 404);
            }
            error(req, res, err.message, 500);
        }
    }
}

export default new UnidadesAtencionController();