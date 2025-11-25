import { z } from 'zod';

export const createUsuarios = z.object({
    correo: z.string().email("Formato de correo electrónico inválido."),
    
    password: z.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres.")
        .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula.")
        .regex(/[0-9]/, "La contraseña debe contener al menos un número."),
    
    rolId: z.number().int("El ID del rol debe ser un número entero."),

    activo: z.boolean().default(true),
});

export const updateUsuarios = createUsuarios
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field must be provided for update',
    });