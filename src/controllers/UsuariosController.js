import UsuariosService from '../services/UsuariosService.js';
import {
    createUsuarios,
    updateUsuarios,
} from '../models/UsuariosModel.js';
import { ZodError } from 'zod';
import { success, error } from '../utils/responseHandler.js'; 

class UsuariosController {
    async createUsuario(req, res) {
        try {
            const validatedData = createUsuarios.parse(req.body);
            const newUsuario = await UsuariosService.createUsuario(validatedData);
            
            success(req, res, newUsuario, 201);
        } catch (err) {
            if (err instanceof ZodError) {
                return error(req, res, { errors: err }, 400); 
            }
            if (err.message.includes('RolId especificado no existe')) {
                return error(req, res, err.message, 404); 
            }
            if (err.message.includes('usuario con este correo')) {
                return error(req, res, err.message, 409);
            }
            error(req, res, err.message, 500); 
        }
    }

    async getAllUsuarios(req, res) {
        try {
            const usuarios = await UsuariosService.getAllUsuarios();
            success(req, res, usuarios, 200);
        } catch (err) {
            error(req, res, err.message, 500);
        }
    }

    async getUsuarioById(req, res) {
        try {
            const usuario = await UsuariosService.getUsuarioById(req.params.id);
            success(req, res, usuario, 200);
        } catch (err) {
            if (err.message.includes('no encontrado')) {
                return error(req, res, err.message, 404);
            }
            error(req, res, err.message, 500);
        }
    }

    async patchUsuario(req, res) {
        try {
            const validatedData = updateUsuarios.parse(req.body);
            const updatedUsuario = await UsuariosService.updateUsuario(
                req.params.id,
                validatedData
            );
            success(req, res, updatedUsuario, 200);
        } catch (err) {
            if (err instanceof ZodError) {
                return error(req, res, { errors: err }, 400);
            }
            if (err.message.includes('no encontrado') || err.message.includes('RolId especificado no existe')) {
                return error(req, res, err.message, 404);
            }
            error(req, res, err.message, 500);
        }
    }

    async deleteUsuario(req, res) {
        try {
            await UsuariosService.deleteUsuario(req.params.id);
            success(req, res, '', 204);
        } catch (err) {
            if (err.message.includes('no encontrado')) {
                return error(req, res, err.message, 404);
            }
            error(req, res, err.message, 500);
        }
    }
}

export default new UsuariosController();