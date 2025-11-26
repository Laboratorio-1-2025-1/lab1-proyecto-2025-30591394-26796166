import prisma from '../config/prisma.js';

class TratamientosRepository {
    async findByNombre(nombre) {
        return prisma.tratamientos.findFirst({
            where: { nombre },
        });
    }

    async create(data) {
        return prisma.tratamientos.create({ data });
    }

    async findAll() {
        return prisma.tratamientos.findMany();
    }

    async findById(id) {
        return prisma.tratamientos.findUnique({
            where: { id: parseInt(id) },
        });
    }

    async update(id, data) {
        return prisma.tratamientos.update({
            where: { id: parseInt(id) },
            data,
        });
    }

    async delete(id) {
        return prisma.tratamientos.delete({
            where: { id: parseInt(id) },
        });
    }
}

export default new TratamientosRepository();