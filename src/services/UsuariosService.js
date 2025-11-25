import UsuariosRepository from '../repositories/UsuariosRepository.js';
import RolesRepository from '../repositories/RolesRepository.js'; // Necesario para validar el rol
import bcrypt from 'bcryptjs';

const saltRounds = 10; // Nivel de seguridad del hash

class UsuariosService {
    async createUsuario(data) {
        const existingUsuario = await UsuariosRepository.findByCorreo(data.correo);
        if (existingUsuario) {
            throw new Error('Ya existe un usuario con este correo.');
        }

        const existingRol = await RolesRepository.findById(data.rolId);
        if (!existingRol) {
            throw new Error('El RolId especificado no existe.');
        }

        // 3. Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        
        const userData = {
            ...data,
            password: hashedPassword, // Reemplaza el password de texto plano por el hash
        };

        return UsuariosRepository.create(userData);
    }

    async getAllUsuarios() {
        return UsuariosRepository.findAll();
    }

    async getUsuarioById(id) {
        const usuario = await UsuariosRepository.findById(id);
        if (!usuario) {
            throw new Error('Usuario no encontrado.');
        }
        return usuario;
    }

    async updateUsuario(id, data) {
        const existingUsuario = await UsuariosRepository.findById(id);
        if (!existingUsuario) {
            throw new Error('Usuario no encontrado para actualizar.');
        }

        // Si el rolId se actualiza, verificar que exista
        if (data.rolId) {
            const existingRol = await RolesRepository.findById(data.rolId);
            if (!existingRol) {
                throw new Error('El RolId especificado no existe.');
            }
        }

        // Si se proporciona una nueva contraseña, la hasheamos
        if (data.password) {
            data.password = await bcrypt.hash(data.password, saltRounds);
        }
        
        return UsuariosRepository.update(id, data);
    }

    async deleteUsuario(id) {
        const existingUsuario = await UsuariosRepository.findById(id);
        if (!existingUsuario) {
            throw new Error('Usuario no encontrado para eliminar.');
        }
        return UsuariosRepository.delete(id);
    }
}

export default new UsuariosService();