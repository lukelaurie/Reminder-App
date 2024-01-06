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
        const name = body.name;
        // verify that fileds are provided correctly
        if (username == null || password == null || name == null) {
            return {
                statusCode: 400,
                body: JSON.stringify("Missing required fields"),
            };
        }
        if (await doesUserExist(username)) {
            return {
                statusCode: 409,
                body: JSON.stringify("Username alrady exists"),
            };
        }
        encryptedPassword = await saltAndHashPassword(password);
        createNewAssociate(username, encryptedPassword, name);
        return {
            statusCode: 200,
            body: JSON.stringify("The new user has been placed!"),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify("An error has occured"),
        };
    }
};

async function doesUserExist(username) {
    // check if the username already exists
    const existingItem = {
        TableName: tableName,
        Key: {
            username: username,
        },
    };
    const foundUser = await dynamoDB.get(existingItem).promise();
    return foundUser.Item != null;
}

async function createNewAssociate(username, encryptedPassword, name) {
    const newAssociate = {
        username: username,
        password: encryptedPassword,
        name: name,
    };
    const putValue = {
        TableName: tableName,
        Item: newAssociate,
    };
    // place the new item into dynamoDB
    await dynamoDB.put(putValue).promise();
}

async function saltAndHashPassword(password) {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw new Error("Error encrypting the password!");
    }
}

