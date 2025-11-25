import CitasService from '../services/CitasService.js';
import {
    createCitas,
    updateCitas,
} from '../models/CitasModel.js';
import { ZodError } from 'zod';
import { success, error } from '../utils/responseHandler.js'; 

class CitasController {
    async createCita(req, res) {
        try {
            const validatedData = createCitas.parse(req.body);
            const newCita = await CitasService.createCita(validatedData);
            
            success(req, res, newCita, 201);
        } catch (err) {
            if (err instanceof ZodError) {
                return error(req, res, { errors: err }, 400); 
            }
            // 404 para errores de dependencia (FK no encontrada)
            if (err.message.includes('no encontrado') || err.message.includes('no encontrada')) {
                return error(req, res, err.message, 404);
            }
            // 409 para el conflicto de horario
            if (err.message.includes('cita programada')) {
                return error(req, res, err.message, 409); 
            }
            error(req, res, err.message, 500); 
        }
    }

    async getAllCitas(req, res) {
        try {
            const citas = await CitasService.getAllCitas();
            success(req, res, citas, 200);
        } catch (err) {
            error(req, res, err.message, 500);
        }
    }

    async getCitaById(req, res) {
        try {
            const cita = await CitasService.getCitaById(req.params.id);
            success(req, res, cita, 200);
        } catch (err) {
            if (err.message.includes('no encontrada')) {
                return error(req, res, err.message, 404);
            }
            error(req, res, err.message, 500);
        }
    }

    async patchCita(req, res) {
        try {
            const validatedData = updateCitas.parse(req.body);
            const updatedCita = await CitasService.updateCita(
                req.params.id,
                validatedData
            );
            success(req, res, updatedCita, 200);
        } catch (err) {
            if (err instanceof ZodError) {
                return error(req, res, { errors: err }, 400);
            }
            // 404 para cita no encontrada o dependencia (FK) no encontrada
            if (err.message.includes('no encontrado') || err.message.includes('no encontrada')) {
                return error(req, res, err.message, 404);
            }
            error(req, res, err.message, 500);
        }
    }

    async deleteCita(req, res) {
        try {
            await CitasService.deleteCita(req.params.id);
            success(req, res, '', 204);
        } catch (err) {
            if (err.message.includes('no encontrada')) {
                return error(req, res, err.message, 404);
            }
            error(req, res, err.message, 500);
        }
    }
}

export default new CitasController();