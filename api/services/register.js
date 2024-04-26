const db = require("./db");
const bcrypt = require("bcryptjs");

async function registerClient(firstName, lastName, login, password, email) {
    try {
        
        const checkQuery = "SELECT COUNT(*) AS count FROM Client WHERE Email = ?";
        const checkResult = await db.query(checkQuery, [email]);
        
        if (checkResult[0].count > 0) {
            return {
                message: "User with this email already exists",
                statusCode: 409,
            };
        }

        
        const salt = await bcrypt.genSalt(10); //tu tworzy sol 
        
        
        const hashedPassword = await bcrypt.hash(password, salt);// tu hasuje 

        
        const insertQuery = "INSERT INTO Client (First_name, Last_name, Login, Password, Email, Salt) VALUES (?, ?, ?, ?, ?, ?)";
        const insertResult = await db.query(insertQuery, [
            firstName,
            lastName,
            login,
            hashedPassword, 
            email,
            salt, //zapis soli 
        ]);

       
        if (insertResult.affectedRows === 1) {
            return {
                message: "User registered successfully",
                statusCode: 201,
            };
        } else {
            return {
                message: "Error registering user",
                statusCode: 500,
            };
        }
    } catch (error) {
        console.error("Error registering client:", error);
        return {
            message: "Internal server error",
            statusCode: 500,
        };
    }
}

module.exports = {
    registerClient,
};
