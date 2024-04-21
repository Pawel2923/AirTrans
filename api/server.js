require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const flightsRouter = require("./routes/flights");
const contactInfoRouter = require("./routes/contact-info");
const announcementsRouter = require("./routes/announcements");
const offerRouter = require("./routes/offer");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");

const app = express();

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Serve Swagger documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "System lotniska." });
});

app.use("/api/flights", flightsRouter);
app.use("/api/contact-info", contactInfoRouter);
app.use("/api/announcements", announcementsRouter)
app.use("/api/offer", offerRouter);
app.use("/api/fetch_client", loginRouter);
app.use("/api/register", registerRouter);

app.use((err, req, res, next) => {
  console.error(err.statusMessage);
  res.status(err.statusCode).json({ message: err.statusMessage });
  return;
});

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);

});