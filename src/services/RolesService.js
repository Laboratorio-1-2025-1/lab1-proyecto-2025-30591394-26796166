import RolesRepository from '../repositories/RolesRepository.js';

class RolesService {
    async createRol(data) {
        const existingRol = await RolesRepository.findByNombre(data.nombre);
        
        if (existingRol) {
            throw new Error('Ya existe un Rol con este nombre.');
        }

        return RolesRepository.create(data);
    }

    async getAllRoles() {
        return RolesRepository.findAll();
    }

    async getRolById(id) {
        const rol = await RolesRepository.findById(id);
        if (!rol) {
            throw new Error('Rol no encontrado.');
        }
        return rol;
    }

    async updateRol(id, data) {
        const existingRol = await RolesRepository.findById(id);
        if (!existingRol) {
            throw new Error('Rol no encontrado para actualizar.');
        }
        if (data.nombre) {
            const nameConflict = await RolesRepository.findByNombre(data.nombre);
            if (nameConflict && nameConflict.id !== parseInt(id)) {
                throw new Error('Ya existe un Rol con este nombre.');
            }
        }
        
        return RolesRepository.update(id, data);
    }

    async deleteRol(id) {
        const existingRol = await RolesRepository.findById(id);
        if (!existingRol) {
            throw new Error('Rol no encontrado para eliminar.');
        }
        return RolesRepository.delete(id);
    }
}

export default new RolesService();