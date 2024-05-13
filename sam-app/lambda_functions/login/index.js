const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

let awsConfig = {
    region: "us-east-2",
    endpoint: "http://dynamodb.us-east-2.amazonaws.com",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};
AWS.config.update(awsConfig);
let dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = "associates";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY_VALUE;

exports.lambdaHandler = async (event) => {
    try {
        console.log("calling login function");
        // Retrieve the data from the request
        const body = JSON.parse(event.body);
        const username = body.username;
        const password = body.password;
        // verify that fileds are provided correctly
        if (!username || !password) {
            return {
                statusCode: 400,
                body: JSON.stringify("Missing required fields"),
            };
        }
        // checks if username is valid
        const user = await retrieveUser(username);
        if (user == null) {
            return {
                statusCode: 401,
                body: JSON.stringify("Username is incorrect"),
            };
        }
        if (!(await isPasswordValid(password, user.password))) {
            return {
                statusCode: 401,
                body: JSON.stringify("Password is incorrect"),
            };
        }
        // the user is authenticated so create a jwt token for cookies/sessions
        const jwtToken = jwt.sign({ username, username }, JWT_SECRET_KEY, {
            expiresIn: "1day",
        });
        // cookie to add to the response
        const cookieToSet = cookie.serialize("token", jwtToken, {
            // age is 1 day
            maxAge: 60 * 60 * 24,
        });
        console.log("about to return with status code 200");
        return {
            statusCode: 200,
            headers: {
                "Set-Cookie": cookieToSet,
            },
            body: JSON.stringify("valid"),
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify("An error has occured"),
        };
    }
};

async function retrieveUser(username) {
    // check if the username already exists
    const existingItem = {
        TableName: tableName,
        Key: {
            username: username,
        },
    };
    const foundUser = await dynamoDB.get(existingItem).promise();
    return foundUser.Item;
}

async function isPasswordValid(password, hashedPassword) {
    try {
        // hashes and salts original password to compare if they are the same
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        return isPasswordValid;
    } catch (error) {
        throw new Error("Error encrypting the password for comparison");
    }
}
