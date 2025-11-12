import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation - Laboratorio I - UCLA DCYT',
      version: '1.0.0',
      description:
        'Documentation of the REST API. Laboratorio I Project - UCLA DCYT',
    },
    servers: [
      {
        url: 'http://localhost:3000/',
      },
    ],
    components: {
      schemas: {
        Persona: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            tipoDocumento: { type: 'string', enum: ['V', 'E'] },
            numeroDocumento: { type: 'string', example: '12345678' },
            nombres: { type: 'string', example: 'Juan' },
            apellidos: { type: 'string', example: 'Pérez' },
            fechaNacimiento: {
              type: 'string',
              format: 'date',
              example: '1990-01-01',
            },
            sexo: { type: 'string', enum: ['M', 'F'] },
            correo: {
              type: 'string',
              format: 'email',
              example: 'juan@example.com',
            },
            telefono: { type: 'string', example: '+584241234567' },
            direccion: { type: 'string', example: 'Calle Falsa 123' },
            contactoEmergencia: { type: 'string', example: '+584241234568' },
            alergias: { type: 'string', example: 'Ninguna' },
            estado: { type: 'boolean', example: true },
          },
        },
        PersonaCreate: {
          type: 'object',
          required: [
            'tipoDocumento',
            'numeroDocumento',
            'nombres',
            'apellidos',
            'fechaNacimiento',
            'sexo',
            'correo',
            'telefono',
            'direccion',
            'contactoEmergencia',
          ],
          properties: {
            tipoDocumento: { type: 'string', enum: ['V', 'E'] },
            numeroDocumento: { type: 'string' },
            nombres: { type: 'string' },
            apellidos: { type: 'string' },
            fechaNacimiento: { type: 'string', format: 'date' },
            sexo: { type: 'string', enum: ['M', 'F'] },
            correo: { type: 'string', format: 'email' },
            telefono: { type: 'string' },
            direccion: { type: 'string' },
            contactoEmergencia: { type: 'string' },
            alergias: { type: 'string' },
            estado: { type: 'boolean' },
          },
        },
        PersonaUpdate: {
          type: 'object',
          properties: {
            tipoDocumento: { type: 'string', enum: ['V', 'E'] },
            numeroDocumento: { type: 'string' },
            nombres: { type: 'string' },
            apellidos: { type: 'string' },
            fechaNacimiento: { type: 'string', format: 'date' },
            sexo: { type: 'string', enum: ['M', 'F'] },
            correo: { type: 'string', format: 'email' },
            telefono: { type: 'string' },
            direccion: { type: 'string' },
            contactoEmergencia: { type: 'string' },
            alergias: { type: 'string' },
            estado: { type: 'boolean' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            errors: { type: 'object' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec
