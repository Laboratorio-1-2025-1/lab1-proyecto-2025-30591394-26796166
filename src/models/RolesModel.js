import { z } from 'zod';

export const createRoles = z.object({
    nombre: z.string().min(3, "El nombre del rol debe tener al menos 3 caracteres.").max(50, "El nombre no debe exceder los 50 caracteres."),
    descripcion: z.string().min(5, "La descripción del rol es requerida.").max(255, "La descripción no debe exceder los 255 caracteres."),
});

export const updateRoles = createRoles
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field must be provided for update',
    });