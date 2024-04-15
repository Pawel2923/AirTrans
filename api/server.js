require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");



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


app.post("/api/fetch_client", (req, res) => {
  const { email, password } = req.body;

  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  connection.connect();

  const query = "SELECT Email, Password FROM Client WHERE Email = ? AND Password = ?";
  connection.query(query, [email, password], async (err, rows, fields) => {
    if (err) {
      res.status(500).send({ message: "Error " + err });
      return;
    };
    if (rows.length === 0) {
      res.status(404).send({ message: "Not found" });
      return;
    } else {
      const id = rows[0].Email;
      const token = jwt.sign({ id }, process.env.SECRET_TOKEN, {
        expiresIn: 86400
      });
      console.log("The token is: " + token);
      return res.status(200).json({ auth: true, accessToken: token });
    
      const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };

    res.cookie('jwt', token, cookieOptions);
    res.status(200).json({ auth: true, accessToken: token });
  }
});

  connection.end();
});

app.post("/api/register", (req, res) => {
  // Pobierz dane z ciała żądania
  const { First_Name,Last_Name,Phone_no,Address,Zip_code,Login, Password,Email } = req.body;

  // Nawiąż połączenie z bazą danych
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
      return;
    }
    if (checkRows[0].count > 0) {
      // Jeśli użytkownik już istnieje, zwróć odpowiedź 409 (konflikt)
      res.status(409).send({ message: "User with this email already exists" });
      return;
    }

    // Wykonaj zapytanie INSERT, aby dodać nowego użytkownika do bazy danych
    const insertQuery = "INSERT INTO Client (First_Name,Last_Name,Phone_no,Address,Zip_code,Login, Password,Email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(insertQuery, [First_Name,Last_Name,Phone_no,Address,Zip_code,Login, Password,Email], (insertErr, insertResult) => {
      if (insertErr) {
        res.status(500).send({ message: "Error " + insertErr });
        return;
      }

      // Zwróć odpowiedź 201 (created), że użytkownik został pomyślnie zarejestrowany
      res.status(201).send({ message: "User registered successfully" });
    });
  });

  // Zakończ połączenie z bazą danych po zakończeniu zapytania
  connection.end();
});

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});