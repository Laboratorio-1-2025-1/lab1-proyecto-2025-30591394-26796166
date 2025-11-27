import swaggerJsdoc from "swagger-jsdoc"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation - Laboratorio I - UCLA DCYT",
      version: "1.0.0",
      description:
        "Documentation of the REST API. Laboratorio I Project - UCLA DCYT",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
    components: {
      schemas: {
        /* Personas (ya existentes) */
        Persona: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            tipoDocumento: { type: "string", enum: ["V", "E"] },
            numeroDocumento: { type: "string", example: "12345678" },
            nombres: { type: "string", example: "Juan" },
            apellidos: { type: "string", example: "Pérez" },
            fechaNacimiento: {
              type: "string",
              format: "date",
              example: "1990-01-01",
            },
            sexo: { type: "string", enum: ["M", "F"] },
            correo: {
              type: "string",
              format: "email",
              example: "juan@example.com",
            },
            telefono: { type: "string", example: "+584241234567" },
            direccion: { type: "string", example: "Calle Falsa 123" },
            contactoEmergencia: { type: "string", example: "+584241234568" },
            alergias: { type: "string", example: "Ninguna" },
            estado: { type: "boolean", example: true },
          },
        },
        PersonaCreate: {
          type: "object",
          required: [
            "tipoDocumento",
            "numeroDocumento",
            "nombres",
            "apellidos",
            "fechaNacimiento",
            "sexo",
            "correo",
            "telefono",
            "direccion",
            "contactoEmergencia",
          ],
          properties: {
            tipoDocumento: { type: "string", enum: ["V", "E"] },
            numeroDocumento: { type: "string" },
            nombres: { type: "string" },
            apellidos: { type: "string" },
            fechaNacimiento: { type: "string", format: "date" },
            sexo: { type: "string", enum: ["M", "F"] },
            correo: { type: "string", format: "email" },
            telefono: { type: "string" },
            direccion: { type: "string" },
            contactoEmergencia: { type: "string" },
            alergias: { type: "string" },
            estado: { type: "boolean" },
          },
        },
        PersonaUpdate: {
          type: "object",
          properties: {
            tipoDocumento: { type: "string", enum: ["V", "E"] },
            numeroDocumento: { type: "string" },
            nombres: { type: "string" },
            apellidos: { type: "string" },
            fechaNacimiento: { type: "string", format: "date" },
            sexo: { type: "string", enum: ["M", "F"] },
            correo: { type: "string", format: "email" },
            telefono: { type: "string" },
            direccion: { type: "string" },
            contactoEmergencia: { type: "string" },
            alergias: { type: "string" },
            estado: { type: "boolean" },
          },
        },

        /* Citas */
        Cita: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            fechaHora: {
              type: "string",
              format: "date-time",
              example: "2025-11-27T09:30:00Z",
            },
            motivo: { type: "string", example: "Consulta general" },
            estadoCita: { type: "string", example: "PROGRAMADA" },
            pacienteId: { type: "integer", example: 1 },
            profesionalId: { type: "integer", example: 2 },
            unidadId: { type: "integer", example: 1 },
          },
        },
        CitaCreate: {
          type: "object",
          required: [
            "fechaHora",
            "motivo",
            "pacienteId",
            "profesionalId",
            "unidadId",
          ],
          properties: {
            fechaHora: { type: "string", format: "date-time" },
            motivo: { type: "string" },
            estadoCita: { type: "string" },
            pacienteId: { type: "integer" },
            profesionalId: { type: "integer" },
            unidadId: { type: "integer" },
          },
        },
        CitaUpdate: {
          type: "object",
          properties: {
            fechaHora: { type: "string", format: "date-time" },
            motivo: { type: "string" },
            estadoCita: { type: "string" },
            pacienteId: { type: "integer" },
            profesionalId: { type: "integer" },
            unidadId: { type: "integer" },
          },
        },

        /* Profesionales */
        Profesional: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            nombres: { type: "string" },
            apellidos: { type: "string" },
            registroProfesional: { type: "string" },
            especialidad: { type: "string" },
            correo: { type: "string", format: "email" },
            telefono: { type: "string" },
            agendaHabilitada: { type: "boolean" },
          },
        },
        ProfesionalCreate: {
          type: "object",
          required: [
            "nombres",
            "apellidos",
            "registroProfesional",
            "especialidad",
            "correo",
            "telefono",
          ],
          properties: {
            nombres: { type: "string" },
            apellidos: { type: "string" },
            registroProfesional: { type: "string" },
            especialidad: { type: "string" },
            correo: { type: "string", format: "email" },
            telefono: { type: "string" },
            agendaHabilitada: { type: "boolean" },
          },
        },
        ProfesionalUpdate: {
          type: "object",
          properties: {
            nombres: { type: "string" },
            apellidos: { type: "string" },
            registroProfesional: { type: "string" },
            especialidad: { type: "string" },
            correo: { type: "string", format: "email" },
            telefono: { type: "string" },
            agendaHabilitada: { type: "boolean" },
          },
        },

        /* Roles */
        Rol: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            nombre: { type: "string" },
            descripcion: { type: "string" },
          },
        },
        RolCreate: {
          type: "object",
          required: ["nombre", "descripcion"],
          properties: {
            nombre: { type: "string" },
            descripcion: { type: "string" },
          },
        },
        RolUpdate: {
          type: "object",
          properties: {
            nombre: { type: "string" },
            descripcion: { type: "string" },
          },
        },

        /* Tratamientos */
        Tratamiento: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            nombre: { type: "string" },
            descripcion: { type: "string" },
            costo: { type: "number" },
            activo: { type: "boolean" },
          },
        },
        TratamientoCreate: {
          type: "object",
          required: ["nombre", "descripcion", "costo"],
          properties: {
            nombre: { type: "string" },
            descripcion: { type: "string" },
            costo: { type: "number" },
            activo: { type: "boolean" },
          },
        },
        TratamientoUpdate: {
          type: "object",
          properties: {
            nombre: { type: "string" },
            descripcion: { type: "string" },
            costo: { type: "number" },
            activo: { type: "boolean" },
          },
        },

        /* Unidades de atención */
        Unidad: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            nombre: { type: "string" },
            direccion: { type: "string" },
            telefono: { type: "string" },
            estado: { type: "boolean" },
          },
        },
        UnidadCreate: {
          type: "object",
          required: ["nombre", "direccion", "telefono"],
          properties: {
            nombre: { type: "string" },
            direccion: { type: "string" },
            telefono: { type: "string" },
            estado: { type: "boolean" },
          },
        },
        UnidadUpdate: {
          type: "object",
          properties: {
            nombre: { type: "string" },
            direccion: { type: "string" },
            telefono: { type: "string" },
            estado: { type: "boolean" },
          },
        },

        /* Usuarios */
        Usuario: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            correo: { type: "string", format: "email" },
            rolId: { type: "integer" },
            activo: { type: "boolean" },
          },
        },
        UsuarioCreate: {
          type: "object",
          required: ["correo", "password", "rolId"],
          properties: {
            correo: { type: "string", format: "email" },
            password: { type: "string" },
            rolId: { type: "integer" },
            activo: { type: "boolean" },
          },
        },
        UsuarioUpdate: {
          type: "object",
          properties: {
            correo: { type: "string", format: "email" },
            password: { type: "string" },
            rolId: { type: "integer" },
            activo: { type: "boolean" },
          },
        },

        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string" },
            errors: { type: "object" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec
