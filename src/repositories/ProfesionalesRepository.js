import prisma from '../config/prisma.js';

class ProfesionalesRepository {
    async findByRegistroProfesional(registroProfesional) {
        return prisma.profesionales.findUnique({
            where: { registroProfesional },
        });
    }

    async create(data) {
        return prisma.profesionales.create({ data });
    }

    async findAll() {
        return prisma.profesionales.findMany();
    }

    async findById(id) {
        return prisma.profesionales.findUnique({
            where: { id: parseInt(id) },
        });
    }

    async update(id, data) {
        return prisma.profesionales.update({
            where: { id: parseInt(id) },
            data,
        });
    }

    async delete(id) {
        return prisma.profesionales.delete({
            where: { id: parseInt(id) },
        });
    }
}

export default new ProfesionalesRepository();