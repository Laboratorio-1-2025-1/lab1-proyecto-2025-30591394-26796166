import prisma from '../config/prisma.js';

class UsuariosRepository {
    async findByCorreo(correo) {
        return prisma.usuarios.findUnique({
            where: { correo },
        });
    }
    
    // Crea un nuevo usuario. Aquí se espera que la contraseña ya esté hasheada.
    async create(data) {
        return prisma.usuarios.create({ data });
    }

    // Obtiene todos los usuarios
    async findAll() {
        // Excluimos la contraseña por seguridad
        return prisma.usuarios.findMany({
            select: {
                id: true,
                correo: true,
                rolId: true,
                activo: true,
            }
        });
    }

    // Busca un usuario por su ID
    async findById(id) {
        // Excluimos la contraseña por seguridad
        return prisma.usuarios.findUnique({
            where: { id: parseInt(id) },
            select: {
                id: true,
                correo: true,
                rolId: true,
                activo: true,
            }
        });
    }

    // Actualiza los datos de un usuario
    async update(id, data) {
        // Si se actualiza la contraseña, debe venir hasheada desde el servicio
        return prisma.usuarios.update({
            where: { id: parseInt(id) },
            data,
        });
    }

    async delete(id) {
        return prisma.usuarios.delete({
            where: { id: parseInt(id) },
        });
    }
}

export default new UsuariosRepository();