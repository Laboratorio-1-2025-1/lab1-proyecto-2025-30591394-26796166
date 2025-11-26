import prisma from '../config/prisma.js';

class RolesRepository {
    async findByNombre(nombre) {
        return prisma.roles.findUnique({
            where: { nombre },
        });
    }

    async create(data) {
        return prisma.roles.create({ data });
    }

    async findAll() {
        return prisma.roles.findMany();
    }

    async findById(id) {
        return prisma.roles.findUnique({
            where: { id: parseInt(id) },
        });
    }

    async update(id, data) {
        return prisma.roles.update({
            where: { id: parseInt(id) },
            data,
        });
    }

    async delete(id) {
        return prisma.roles.delete({
            where: { id: parseInt(id) },
        });
    }
}

export default new RolesRepository();