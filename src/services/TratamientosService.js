import TratamientosRepository from '../repositories/TratamientosRepository.js';

class TratamientosService {
    async createTratamiento(data) {
        const existingTratamiento = await TratamientosRepository.findByNombre(data.nombre);
        
        if (existingTratamiento) {
            throw new Error('Ya existe un Tratamiento con este nombre.');
        }
        return TratamientosRepository.create(data);
    }

    async getAllTratamientos() {
        return TratamientosRepository.findAll();
    }

    async getTratamientoById(id) {
        const tratamiento = await TratamientosRepository.findById(id);
        if (!tratamiento) {
            throw new Error('Tratamiento no encontrado.');
        }
        return tratamiento;
    }

    async updateTratamiento(id, data) {
        const existingTratamiento = await TratamientosRepository.findById(id);
        if (!existingTratamiento) {
            throw new Error('Tratamiento no encontrado para actualizar.');
        }
        if (data.nombre) {
            const nameConflict = await TratamientosRepository.findByNombre(data.nombre);
            if (nameConflict && nameConflict.id !== parseInt(id)) {
                throw new Error('Ya existe un Tratamiento con este nombre.');
            }
        }
        
        return TratamientosRepository.update(id, data);
    }

    async deleteTratamiento(id) {
        const existingTratamiento = await TratamientosRepository.findById(id);
        if (!existingTratamiento) {
            throw new Error('Tratamiento no encontrado para eliminar.');
        }
        return TratamientosRepository.delete(id);
    }
}

export default new TratamientosService();