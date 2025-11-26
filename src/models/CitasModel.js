import { z } from 'zod';

export const createCitas = z.object({
    fechaHora: z.coerce.date({
        errorMap: (issue, ctx) => {
            if (issue.code === z.ZodIssueCode.invalid_date) {
                return { message: "Formato de fecha y hora inválido. Se espera formato ISO 8601 (ej. 'YYYY-MM-DDTHH:MM:SSZ')." };
            }
            return { message: ctx.defaultError };
        }
    }),
    
    motivo: z.string().min(5, "El motivo de la cita es requerido.").max(500, "El motivo no debe exceder los 500 caracteres."),
    
    estadoCita: z.string().default('PROGRAMADA'),

    // Llaves foráneas (IDs)
    pacienteId: z.number().int("El ID del paciente debe ser un número entero."),
    profesionalId: z.number().int("El ID del profesional debe ser un número entero."),
    unidadId: z.number().int("El ID de la unidad debe ser un número entero."),
});

export const updateCitas = createCitas
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field must be provided for update',
    });