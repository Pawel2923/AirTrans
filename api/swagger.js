const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "AirTrans API",
		version: "1.0.0",
		description: "API for AirTrans",
	},
};

const options = {
	swaggerDefinition,
	apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;