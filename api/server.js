require("dotenv").config();
const express = require("express");
const cors = require("cors");
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

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

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
  console.error(err.message, err.stack);
  res.status(500).json({ message: err.message });
  return;
});

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);

});