import ProfesionalesRepository from '../repositories/ProfesionalesRepository.js';

class ProfesionalesService {
    async createProfesional(data) {
        const existingProfesional =
            await ProfesionalesRepository.findByRegistroProfesional(
                data.registroProfesional
            );
        
        if (existingProfesional) {
            throw new Error('Ya existe un profesional con este número de registro.');
        }
        return ProfesionalesRepository.create(data);
    }

    async getAllProfesionales() {
        return ProfesionalesRepository.findAll();
    }

    async getProfesionalById(id) {
        const profesional = await ProfesionalesRepository.findById(id);
        if (!profesional) {
            throw new Error('Profesional no encontrado.');
        }
        return profesional;
    }

    async updateProfesional(id, data) {
        const existingProfesional = await ProfesionalesRepository.findById(id);
        if (!existingProfesional) {
            throw new Error('Profesional no encontrado para actualizar.');
        }
        return ProfesionalesRepository.update(id, data);
    }

    async deleteProfesional(id) {
        const existingProfesional = await ProfesionalesRepository.findById(id);
        if (!existingProfesional) {
            throw new Error('Profesional no encontrado para eliminar.');
        }
        return ProfesionalesRepository.delete(id);
    }
}

export default new ProfesionalesService();