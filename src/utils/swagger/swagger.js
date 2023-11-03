import swaggerJsdoc from 'swagger-jsdoc';
import __dirname from '../utils.js'

const options = {
    swaggerDefinition: {
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentación de mi API',
        },
    },
    apis: [`src/docs/*.yaml`],
};

export const specs = swaggerJsdoc(options);


