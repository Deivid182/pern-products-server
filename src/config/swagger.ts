import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    tags: [
      {
        name: "Products",
        description: "Products API"
      }
    ],
    info: {
      title: "REST API Node.js / Express / TypeScript",
      version: "1.0.0",
      description: "REST Docs for Products"
    }
  },
  apis: ["./src/router.ts"]
}

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec