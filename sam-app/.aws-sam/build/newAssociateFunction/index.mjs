import AWS from "aws-sdk";
import bcrypt from "bcryptjs";

let awsConfig = {
    region: "us-east-2",
    endpoint: "http://dynamodb.us-east-2.amazonaws.com",
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
};
AWS.config.update(awsConfig);
let dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = "associates";

export const handler = async (event) => {
    try {
        // Retrieve the data from the request
        const body = JSON.parse(event.body);
        const username = body.username;
        const password = body.password;
        const phoneNumber = body.phoneNumber;
        const name = body.name;
        const companyName = body.companyName
        // verify that fileds are provided correctly
        if (!username || !password || !phoneNumber || !name || !companyName) {
            return {
                statusCode: 400,
                body: "Missing required fields"
            };
        }
        if (await doesUserExist(username)) {
            return {
                statusCode: 409,
                body: "Username alrady exists"
            };
        }
        const encryptedPassword = await saltAndHashPassword(password);
        await createNewAssociate(username, encryptedPassword, phoneNumber, name, companyName);
        return {
            statusCode: 200,
            body: "The new user has been placed!"
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: "An error has occured"
        };
    }
};

async function doesUserExist(username) {
    // check if the username already exists
    const existingItem = {
        TableName: tableName,
        Key: {
            username: username
        }
    };
    const foundUser = await dynamoDB.get(existingItem).promise();
    return foundUser.Item != null;
}

async function createNewAssociate(username, encryptedPassword, phoneNumber, name, companyName) {
    const newAssociate = {
        username: username,
        password: encryptedPassword,
        name: name,
        phoneNumber: phoneNumber,
        companyName: companyName
    };
    const putValue = {
        TableName: tableName,
        Item: newAssociate
    };
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
