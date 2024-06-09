const AWS = require("aws-sdk");
const cookieHandler = require("get_username_from_cookie");

let awsConfig = {
    region: "us-east-2",
    endpoint: "http://dynamodb.us-east-2.amazonaws.com",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};
AWS.config.update(awsConfig);

let dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = "associates";

exports.lambdaHandler = async (event) => {
    try {
        let associateUsername;
        // checks if username was provided in the cookie
        try {
            associateUsername = await cookieHandler.getUsernameFromCookie(
                event
            );
        } catch (error) {
            return {
                statusCode: 400,
                body: JSON.stringify("Invalid cookie was provided"),
            };
        }
        // get all of the data associated with the associate
        associate = await getAssociate(associateUsername);
        let associateData = {
            "name": associate["name"],
            "companyName": associate["companyName"]
        }
        return {
            statusCode: 200,
            body: JSON.stringify(associateData)
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify("An error has occured"),
        };
    }
};

async function getAssociate(associateUsername) {
    const existingItem = {
        TableName: tableName,
        Key: {
            username: associateUsername,
        },
    };
    const foundUser = await dynamoDB.get(existingItem).promise();
    return foundUser.Item;
}