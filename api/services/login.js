const db = require("./db");
const bcrypt = require("bcryptjs");

async function fetchClient(email, userInputPassword) {
    if (!email || !userInputPassword) {
        return {
            response: { message: "Invalid arguments: email and userInputPassword are required", statusCode: 400 },
        };
    }

    try {
        //tu pobranie jest soli 
        const queryGetSalt = "SELECT Salt FROM Client WHERE Email = ?";
        const saltResult = await db.query(queryGetSalt, [email]);

        if (saltResult.length === 0) {
            return {
                response: { message: "User not found", statusCode: 404 },
            };
        }

        const salt = saltResult[0].Salt;

        //tu haszujes haslo od uzytkowniak 
        const hashedPassword = await bcrypt.hash(userInputPassword, salt);

        //tu sprawdza czy pasuje 
        const queryCheckUser = "SELECT COUNT(*) AS user_exists FROM Client WHERE Email = ? AND Password = ?";
        const userExistsRows = await db.query(queryCheckUser, [email, hashedPassword]);
//w tym ifie mi sie zatrzymuje jak wprowadze poprawne dane i nwm czemu 
        if (userExistsRows.length === 0 || userExistsRows[0].user_exists === 0) {
            return {
                response: { message: "Incorrect email or password", statusCode: 401 },
            };
        }

        
        return { response: { statusCode: 200 }, id: email };
    } catch (error) {
        console.error("Error fetching client:", error);
        return {
            response: { message: "Internal server error", statusCode: 500 },
        };
    }
}

module.exports = {
    fetchClient,
};
