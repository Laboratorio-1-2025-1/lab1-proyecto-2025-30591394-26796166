import ProfesionalesService from '../services/ProfesionalesService.js';
import {
    createProfesionales,
    updateProfesionales,
} from '../models/ProfesionalesModel.js';
import { ZodError } from 'zod';
import { success, error } from '../utils/responseHandler.js'; 

class ProfesionalesController {
    async createProfesional(req, res) {
        try {
            const validatedData = createProfesionales.parse(req.body);
            
            const nuevoProfesional = await ProfesionalesService.createProfesional(
                validatedData
            );

            success(req, res, nuevoProfesional, 201);
        } catch (err) {
            if (err instanceof ZodError) {
                return error(req, res, { errors: err }, 400);
            }
            if (err.message.includes('número de registro')) {
                return error(req, res, err.message, 409);
            }
            error(req, res, err.message, 500);
        }
    }

    async getAllProfesionales(req, res) {
        try {
            const profesionales = await ProfesionalesService.getAllProfesionales();
            success(req, res, profesionales, 200);
        } catch (err) {
            error(req, res, err.message, 500);
        }
    }

    async getProfesionalById(req, res) {
        try {
            const profesional = await ProfesionalesService.getProfesionalById(
                req.params.id
            );
            success(req, res, profesional, 200);
        } catch (err) {
            if (err.message.includes('no encontrado')) {
                return error(req, res, err.message, 404);
            }
            error(req, res, err.message, 500);
        }
    }

    async updateProfesional(req, res) {
        try {
            const validatedData = updateProfesionales.parse(req.body);
            const updatedProfesional = await ProfesionalesService.updateProfesional(
                req.params.id,
                validatedData
            );
            success(req, res, updatedProfesional, 200);
        } catch (err) {
            if (err instanceof ZodError) {
                return error(req, res, { errors: err }, 400);
            }
            if (err.message.includes('no encontrado')) {
                return error(req, res, err.message, 404);
            }
            error(req, res, err.message, 500);
        }
    }

    async deleteProfesional(req, res) {
        try {
            await ProfesionalesService.deleteProfesional(req.params.id);
            success(req, res, '', 204); 
        } catch (err) {
            if (err.message.includes('no encontrado')) {
                return error(req, res, err.message, 404);
            }
            error(req, res, err.message, 500);
        }
    }
}

export default new ProfesionalesController();