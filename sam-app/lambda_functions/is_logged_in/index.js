const cookieHandler = require("get_username_from_cookie");

exports.lambdaHandler = async (event) => {
    try {
        // check if the username from the cookie exists
        if (!(await cookieHandler.getUsernameFromCookie(event))) {
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
