import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'User API',
        version: '1.0.0',
        description: 'API for E-commerce app'
    },
    servers: [
        {
            url: 'http://localhost:3000' // Test environment
        },
        {
            url: 'https://e-commerce-backend-g2.onrender.com' // Staging environment
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        },
        schemas: {
            createNewUserInterface: {
                type: 'object',
                properties: {
                    firstName: {
                        type: 'string'
                    },
                    lastName: {
                        type: 'string'
                    },
                    email: {
                        type: 'string',
                        format: 'email'
                    },
                    password: {
                        type: 'string'
                    },
                    phone: {
                        type: 'string'
                    },
                    DOB: {
                        type: 'string',
                        format: 'date'
                    },
                    imageUrl: {
                        type: 'string',
                        pattern: '^.*\\.jpg$', // Regex pattern to match strings ending with .jpg
                        example: 'profile.jpg'
                    }
                },
                required: ['firstName', 'lastName', 'email', 'password']
            },
            productID: {
                type: 'object',
                properties: {
                    productId: {
                        type: 'number',
                        example: 1
                    }
                },
                required: ['productId']
            },
            userReview: {
                type: 'object',
                properties: {
                    productId: {
                        type: 'number',
                        example: 1
                    },
                    newReview: {
                        type: 'string'
                    },
                    newRating: {
                        type: 'number',
                        example: 1
                    }
                },
                required: ['productId', 'newReview', 'newRating']
            }
        }
    },
    security: [
        {
            bearerAuth: []
        }
    ]
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./src/**/*.ts']
};

export const swaggerSpec = swaggerJsdoc(options);
