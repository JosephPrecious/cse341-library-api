const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Library API",
    version: "1.0.0",
    description: "CSE341 Library API"
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server"
    },
    
    {
      url: "https://cse341-library-api-o2rw.onrender.com",
      description: "Render server"
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerDocs;