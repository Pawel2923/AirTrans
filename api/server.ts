require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./swagger";

import flightsRouter from "./routes/flights";
import contactInfoRouter from "./routes/contact-info";
import announcementsRouter from "./routes/announcements";
import offerRouter from "./routes/offer";
import loginRouter from "./routes/login";
import registerRouter from "./routes/register";
import airplaneRouter from "./routes/airplane";
import carsRouter from "./routes/cars";
import parkingRouter from "./routes/parking";
import rentRouter from "./routes/rent";
import airfieldRouter from "./routes/airfield";
import authenticateRouter from "./routes/authenticate";
import logoutRouter from "./routes/logout";
import employeesRouter from "./routes/employees";
import usersRouter from "./routes/users";
import equipmentRouter from "./routes/equipment";
import gatesRouter from "./routes/gates";
import ticketsRouter from "./routes/tickets";
import logsRouter from "./routes/logs";
import login_logRouter from "./routes/login_log";
import filesRouter from "./routes/files";
import stripeRouter from './routes/stripe';
import { Err } from "./Types";

const app = express();

var corsOptions = {
	credentials: true,
	origin: process.env.CLIENT_ORIGIN || "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// simple route
app.get("/", (_req, res) => {
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
app.use("/parking", parkingRouter);
app.use("/rent", rentRouter);
app.use("/airfield", airfieldRouter);
app.use("/authenticate", authenticateRouter);
app.use("/employees", employeesRouter);
app.use("/users", usersRouter);
app.use("/logout", logoutRouter);
app.use("/sprzet", equipmentRouter);
app.use("/bramki", gatesRouter);
app.use("/tickets", ticketsRouter);
app.use("/logi", logsRouter);
app.use("/login_log", login_logRouter);
app.use("/files", filesRouter);
app.use('/stripe', stripeRouter);


app.use((err: Err, _req: Request, res: Response, _next: NextFunction): any => {
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
