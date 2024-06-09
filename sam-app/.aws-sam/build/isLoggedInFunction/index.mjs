import { getUsernameFromCookie } from "get_username_from_cookie/index.mjs";

export const handler = async (event) => {
    try {
        // check if the username from the cookie exists
        if (!(await getUsernameFromCookie(event))) {
            return {
                statusCode: 401,
                body: "no token was provided"
            };
        }
        // The username is valid
        return {
            statusCode: 200,
            body: "valid"
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: "The token is invalid"
        };
    }
};
