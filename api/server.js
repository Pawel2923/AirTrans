require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

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


app.get("/api/fetch_client", (req, res) => {
  // Pobierz adres e-mail z parametru zapytania
  const email = req.query.email;

  // Nawiąż połączenie z bazą danych
  const connection = mysql.createConnection({ 
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
  });

  connection.connect();

  const query = "SELECT Email,Password FROM Client WHERE Email = ?";
  connection.query(query, [email], (err, rows, fields) => {
      if (err) {
          // Jeśli wystąpił błąd, zwróć odpowiedź 500 z komunikatem o błędzie
          res.status(500).send({ message: "Error " + err });
          return;
      };
      if (rows.length === 0) {
          // Jeśli nie znaleziono adresu e-mail, zwróć odpowiedź 404
          res.status(404).send({ message: "Not found" });
          return;
      };
    
      // Jeśli nie ma błędu, zwróć wynik zapytania jako JSON
      res.json({ status: 200, message: rows });
  });

  // Zakończ połączenie z bazą danych po zakończeniu zapytania
  connection.end();
});

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});