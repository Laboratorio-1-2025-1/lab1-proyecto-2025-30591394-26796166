import { z } from 'zod';

export const createTratamientos = z.object({
    nombre: z.string().min(3, "El nombre del tratamiento debe tener al menos 3 caracteres.").max(100, "El nombre no debe exceder los 100 caracteres."),
    descripcion: z.string().min(5, "La descripción es requerida.").max(500, "La descripción no debe exceder los 500 caracteres."),
    costo: z.number().min(0, "El costo debe ser un valor positivo."),
    activo: z.boolean().default(true),
});

export const updateTratamientos = createTratamientos
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field must be provided for update',
    });