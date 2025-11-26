import UnidadesAtencionRepository from '../repositories/UnidadesAtencionRepository.js';

class UnidadesAtencionService {
    async createUnidad(data) {
        const existingUnidad = await UnidadesAtencionRepository.findByNombre(data.nombre);
        
        if (existingUnidad) {
            throw new Error('Ya existe una Unidad de Atención con este nombre.');
        }

        return UnidadesAtencionRepository.create(data);
    }

    async getAllUnidades() {
        return UnidadesAtencionRepository.findAll();
    }

    async getUnidadById(id) {
        const unidad = await UnidadesAtencionRepository.findById(id);
        if (!unidad) {
            throw new Error('Unidad de Atención no encontrada.');
        }
        return unidad;
    }

    async updateUnidad(id, data) {
        const existingUnidad = await UnidadesAtencionRepository.findById(id);
        if (!existingUnidad) {
            throw new Error('Unidad de Atención no encontrada para actualizar.');
        }
        return UnidadesAtencionRepository.update(id, data);
    }

    async deleteUnidad(id) {
        const existingUnidad = await UnidadesAtencionRepository.findById(id);
        if (!existingUnidad) {
            throw new Error('Unidad de Atención no encontrada para eliminar.');
        }
        // Nota: Antes de eliminar, se debería chequear si hay citas asociadas
        return UnidadesAtencionRepository.delete(id);
    }
}

export default new UnidadesAtencionService();