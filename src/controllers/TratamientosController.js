import TratamientosService from '../services/TratamientosService.js';
import {
    createTratamientos,
    updateTratamientos,
} from '../models/TratamientosModel.js';
import { ZodError } from 'zod';
import { success, error } from '../utils/responseHandler.js'; 

class TratamientosController {
    async createTratamiento(req, res) {
        try {
            const validatedData = createTratamientos.parse(req.body);
            const newTratamiento = await TratamientosService.createTratamiento(validatedData);
            
            success(req, res, newTratamiento, 201);
        } catch (err) {
            if (err instanceof ZodError) {
                return error(req, res, { errors: err }, 400); 
            }
            if (err.message.includes('Tratamiento con este nombre')) {
                return error(req, res, err.message, 409);
            }
            error(req, res, err.message, 500); 
        }
    }

    async getAllTratamientos(req, res) {
        try {
            const tratamientos = await TratamientosService.getAllTratamientos();
            success(req, res, tratamientos, 200);
        } catch (err) {
            error(req, res, err.message, 500);
        }
    }

    async getTratamientoById(req, res) {
        try {
            const tratamiento = await TratamientosService.getTratamientoById(req.params.id);
            success(req, res, tratamiento, 200);
        } catch (err) {
            if (err.message.includes('no encontrado')) {
                return error(req, res, err.message, 404);
            }
            error(req, res, err.message, 500);
        }
    }

    async patchTratamiento(req, res) {
        try {
            const validatedData = updateTratamientos.parse(req.body);
            const updatedTratamiento = await TratamientosService.updateTratamiento(
                req.params.id,
                validatedData
            );
            success(req, res, updatedTratamiento, 200);
        } catch (err) {
            if (err instanceof ZodError) {
                return error(req, res, { errors: err }, 400);
            }
            if (err.message.includes('no encontrado')) {
                return error(req, res, err.message, 404);
            }
            if (err.message.includes('Tratamiento con este nombre')) {
                return error(req, res, err.message, 409);
            }
            error(req, res, err.message, 500);
        }
    }

    async deleteTratamiento(req, res) {
        try {
            await TratamientosService.deleteTratamiento(req.params.id);
            success(req, res, '', 204);
        } catch (err) {
            if (err.message.includes('no encontrado')) {
                return error(req, res, err.message, 404);
            }
            error(req, res, err.message, 500);
        }
    }
}

export default new TratamientosController();