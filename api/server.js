require("dotenv").config();
const express = require("express");
const cors = require("cors");
const flightsRouter = require("./routes/flights");
const contactInfoRouter = require("./routes/contact-info");
const announcementsRouter = require("./routes/announcements");
const offerRouter = require("./routes/offer");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.post("/api/fetch_client", (req, res) => {
  const { email, password: userInputPassword } = req.body;

  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  connection.connect();

  const query = "SELECT Email, Password FROM Client WHERE Email = ?";
  connection.query(query, [email], async (err, rows, fields) => {
    if (err) {
      res.status(500).send({ message: "Error " + err });
      return;
    };
    if (rows.length === 0) {
      res.status(404).send({ message: "Not found" });
      return;
    } else {
      const storedHashedPassword = rows[0].Password;
      bcrypt.compare(userInputPassword, storedHashedPassword, (err, result) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return;
        }

        if (result) {
          const id = rows[0].Email;
          const token = jwt.sign({ id }, process.env.SECRET_TOKEN, {
            expiresIn: 86400
          });
          console.log("The token is: " + token);
          res.status(200).json({ auth: true, accessToken: token });
          return res.status(200).json({ auth: true, accessToken: token });
        } else {
          console.log('Passwords do not match! Authentication failed.');
          res.status(401).send({ message: "Authentication failed" });
          return;
        }
      });
    }
  });
  connection.end();
});

app.post("/api/register", (req, res) => {
  // Pobierz dane z ciała żądania
  const { First_name, Last_name, Login, Password, Email } = req.body;

  const connection = mysql.createConnection({ 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  connection.connect();

  const checkQuery = "SELECT COUNT(*) as count FROM Client WHERE Email = ?";
  connection.query(checkQuery, [Email], (checkErr, checkRows) => {
    if (checkErr) {
      res.status(500).send({ message: "Error " + checkErr });
      connection.end(); 
      return;
    }
    if (checkRows[0].count > 0) {
      res.status(409).send({ message: "User with this email already exists" });
      connection.end();
      return;
    }

    
    const insertQuery = "INSERT INTO Client (First_name, Last_name, Login, Password, Email) VALUES (?, ?, ?, ?, ?)";
    connection.query(insertQuery, [First_name, Last_name, Login, Password, Email], (insertErr, insertResult) => {
      if (insertErr) {
        res.status(500).send({ message: "Error " + insertErr });
        connection.end(); // Zamknij połączenie w przypadku błędu
        return;
      }

      res.status(201).send({ insertResult, message: "User registered successfully" });
      connection.end(); // Zamknij połączenie po zakończeniu zapytania
    });
  });
});

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);

});