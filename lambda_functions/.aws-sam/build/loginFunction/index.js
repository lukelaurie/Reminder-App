const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");

let awsConfig = {
    region: "us-east-2",
    endpoint: "http://dynamodb.us-east-2.amazonaws.com",
    accessKeyId: "AKIAZJG5FES4D43SUYML",
    secretAccessKey: "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",
};
AWS.config.update(awsConfig);
let dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = "associates";

exports.lambdaHandler = async (event) => {
    try {
        // Retrieve the data from the request
        const body = JSON.parse(event.body);
        const username = body.username;
        const password = body.password;
        // verify that fileds are provided correctly
        if (username == null || password == null) {
            return {
                statusCode: 400,
                body: JSON.stringify("Missing required fields"),
            };
        }
        // checks if username is valid
        const user = await retrieveUser(username);
        console.log("user is " + user + "\n\n");
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
        return {
            statusCode: 200,
            body: JSON.stringify("valid"),
        };
    } catch (error) {
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
