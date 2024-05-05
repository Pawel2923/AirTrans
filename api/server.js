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
const airplaneRouter = require("./routes/airplane");
const carsRouter = require("./routes/cars");
const rentRouter = require("./routes/rent");
const parkingRouter = require("./routes/parking");

const app = express();

var corsOptions = {
	origin: process.env.CLIENT_ORIGIN || "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// simple route
app.get("/", (req, res) => {
	res.json({ message: "System lotniska." });
});

app.use("/flights", flightsRouter);
app.use("/contact-info", contactInfoRouter);
app.use("/announcements", announcementsRouter);
app.use("/offer", offerRouter);
app.use("/fetch_client", loginRouter);
app.use("/register", registerRouter);
app.use("/airplane", airplaneRouter);
app.use("/cars", carsRouter);
app.use("/rent", rentRouter);
app.use("/parking", parkingRouter);


app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";
	res.status(statusCode).json({ message });
	return;
});

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
