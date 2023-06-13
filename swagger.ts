import { getUsers, seedUsers, postBooking, getBooking, patchBooking, deleteBooking, seedParkSpot } from './src/open-api/api-docs';

export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'APIs Document',
    description: 'your description here',
    termsOfService: '',
    contact: {
      name: 'Mark Uche',
      email: 'ucheuzochukwumark@gmail.com'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  tags: [
    {
      name: 'Users',
    },
  ],
  paths: {
    '/auth/users': {
      get: getUsers,
    },
    '/auth/seed-users': {
      post: seedUsers,
    },
    '/parking-spot': {
      post: seedParkSpot,
    },
    '/booking': {
      post: postBooking,
      get: getBooking,
      patch: patchBooking,
      delete: deleteBooking
    },
  },
  servers: [
    {
      url: 'http://localhost:4000/api/v1',
      description: 'Local server',
    },
    {
      url: 'https://your_production_url/api/v1',
      description: 'Production Env',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              success: {
                type: 'boolean',
                const: false,
                description: 'Indicates if the request was successful',
              },
              message: {
                type: 'string',
                description: 'Error message',
              },
              rawErrors: {
                type: 'array',
                items: {
                  type: 'string',
                },
                description: 'Raw error messages',
              },
              stack: {
                type: 'string',
                description: 'Stack trace of the error',
              },
            },
            required: ['success', 'message', 'rawErrors', 'stack'],
            additionalProperties: false,
          },
        },
        required: ['error'],
        additionalProperties: false,
      },
      Booking: {
        type: 'object',
        properties: {
          startTime: {
            type: 'string',
            format: 'date-time',
            description: 'Start time of the booking',
          },
          endTime: {
            type: 'string',
            format: 'date-time',
            description: 'End time of the booking',
          },
          parkingSpotId: {
            type: 'integer',
            description: 'ID of the parking spot',
          },
        },
      },
    },
  },
};
