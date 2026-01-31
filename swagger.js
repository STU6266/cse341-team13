const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'University Library Management API',
    description: 'University Library Management API documentation'
  },
  host: 'localhost:3000',
  schemes: ['http','https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);