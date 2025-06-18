const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "F1 Shop API",
      version: "1.0.0",
      description: "Документација за рутите во твојата е-commerce платформа",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Локален сервер",
      },
    ],
  },
  apis: ["./routes/*.js"], // каде се дефинирани рутите со JSDoc коментари
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
