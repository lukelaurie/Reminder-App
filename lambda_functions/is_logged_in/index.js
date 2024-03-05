const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY_VALUE;

exports.lambdaHandler = async (event) => {
    try {
        // check if the username from the cookie exists
        if (!(await wasTokenValid(event))) {
            return {
                statusCode: 401,
                body: JSON.stringify("no token was provided"),
            };
        }
        // The username is valid
        return {
            statusCode: 200,
            body: JSON.stringify("valid"),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify("The token is invalid"),
        };
    }
};

async function wasTokenValid(event) {
    // verify that a cookie has been passed with the request
    const cookies = cookie.parse(event.headers.cookie || event.headers.Cookie);
    const token = cookies.token;
    if (!token) {
        return null;
    }
    // verify that the token is valied
    const decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET_KEY, (err, decodedToken) => {
            if (err) {
                // the jwt check has failed
                reject(err);
            } else {
                // the jwt check was successful
                resolve(decodedToken);
            }
        });
    });
    return decoded;
}
