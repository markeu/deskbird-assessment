export const getUsers = {
  tags: ['Users'],
  description: 'Returns all users from the system',
  operationId: 'getUsers',
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    '200': {
      description: 'A list of users.',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'number',
                  description: 'User ID',
                },
                name: {
                  type: 'string',
                  description: 'User Name',
                },
                email: {
                  type: 'string',
                  description: 'User Email',
                },
              },
            },
          },
        },
      },
    },
  },
};

export const seedUsers = {
  tags: ['Users'],
  description: 'Seed users into the system',
  operationId: 'seedUsers',
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    '200': {
      description: 'Seed hypothetical user values',
      content: {
        'application/json': {
          schema: {
            type: 'string',
            example: 'Successfully Seeded Users!!', // Add the example value
          },
        },
      },
    },
  },
};

export const postBooking = {
  tags: ['Bookings'],
  description: 'Create a booking',
  operationId: 'createBooking',
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    description: 'Create a new booking in the service',
    content: {
      'application/json': {
        schema: {
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
          required: ['startTime', 'endTime', 'parkingSpotId'],
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Successful booking',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                format: 'date-time',
                description: 'Booking Id',
              },
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
    },
    '500': {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ErrorResponse',
          },
        },
      },
    },
  },
};

export const getBooking = {
  tags: ['Bookings'],
  description: 'Users (Admin/Standard) get bookings from the system',
  operationId: 'getBooking',
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    '200': {
      description: 'Successful response',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'number',
                      description: 'Booking ID',
                    },
                    createdBy: {
                      type: 'string',
                      description: 'Email of the creator',
                    },
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
                      type: 'number',
                      description: 'Parking spot ID',
                    },
                    createdAt: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Timestamp of creation',
                    },
                    updatedAt: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Timestamp of last update',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '500': {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ErrorResponse',
          },
        },
      },
    },
  },
};


export const patchBooking = {
  tags: ['Bookings'],
  description: 'Update a booking',
  operationId: 'updateBooking',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      in: 'query',
      name: 'bookingId',
      schema: {
        type: 'integer',
        description: 'ID of the booking',
      },
      required: true,
    },
  ],
  requestBody: {
    description: 'Updated booking information',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Booking',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Successful update',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'integer',
                description: 'Number of affected updates',
              },
            },
          },
        },
      },
    },
    '500': {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ErrorResponse',
          },
        },
      },
    },
  },
};

export const deleteBooking = {
  tags: ['Bookings'],
  description: 'Delete a booking',
  operationId: 'deleteBooking',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      in: 'query',
      name: 'bookingId',
      schema: {
        type: 'integer',
        description: 'ID of the booking',
      },
      required: true,
    },
  ],
  responses: {
    '200': {
      description: 'Successful deletion',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'string',
                description: 'Success message',
                example: 'Booking deleted successfully',
              },
            },
          },
        },
      },
    },
    '500': {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ErrorResponse',
          },
        },
      },
    },
  },
};

