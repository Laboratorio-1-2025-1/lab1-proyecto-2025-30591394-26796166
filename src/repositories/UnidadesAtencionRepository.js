import prisma from '../config/prisma.js';

class UnidadesAtencionRepository {
    async findByNombre(nombre) {
        return prisma.unidadesAtencion.findFirst({
            where: { nombre },
        });
    }

    async create(data) {
        return prisma.unidadesAtencion.create({ data });
    }

    async findAll() {
        return prisma.unidadesAtencion.findMany();
    }

    async findById(id) {
        return prisma.unidadesAtencion.findUnique({
            where: { id: parseInt(id) },
        });
    }

    async update(id, data) {
        return prisma.unidadesAtencion.update({
            where: { id: parseInt(id) },
            data,
        });
    }

    async delete(id) {
        return prisma.unidadesAtencion.delete({
            where: { id: parseInt(id) },
        });
    }
}

export default new UnidadesAtencionRepository();