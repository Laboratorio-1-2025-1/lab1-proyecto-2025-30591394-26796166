import { z } from 'zod';

export const createProfesionales = z.object({
    nombres: z.string().min(1, "El nombre es requerido.").max(100, "El nombre no debe exceder los 100 caracteres."),
    apellidos: z.string().min(1, "El apellido es requerido.").max(100, "El apellido no debe exceder los 100 caracteres."),
    registroProfesional: z.string().regex(/^[0-9A-Z]{5,15}$/, "El registro profesional debe ser alfanumérico (mayúsculas y números) y tener entre 5 y 15 caracteres."),
    especialidad: z.string().min(5, "Debe especificar la especialidad.").max(100, "La especialidad no debe exceder los 100 caracteres."),
    correo: z.string().email("Formato de correo inválido."),
    telefono: z.string().min(11, "El teléfono debe tener al menos 11 dígitos.").max(15, "El teléfono no debe exceder los 15 dígitos."),
    agendaHabilitada: z.boolean().default(true),
});

export const updateProfesionales = createProfesionales
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field must be provided for update',
    });