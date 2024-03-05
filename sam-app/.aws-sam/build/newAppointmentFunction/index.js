const AWS = require("aws-sdk");
const cookieHandler = require("get_username_from_cookie")
const { v4: uuidv4 } = require("uuid");

let awsConfig = {
    region: "us-east-2",
    endpoint: "http://dynamodb.us-east-2.amazonaws.com",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};
AWS.config.update(awsConfig);

let dynamoDB = new AWS.DynamoDB.DocumentClient();
const appointmentTableName = "appointment";
const associateTableName = "associates";

exports.lambdaHandler = async (event) => {
    try {
        // Retrieve the data from the request
        const body = JSON.parse(event.body);
        const startDate = body.startDate;
        const endDate = body.endDate;
        const notes = body.notes;
        const clientName = body.clientName;
        const clientPhoneNumber = body.clientPhoneNumber;
        let associateUsername;
        // checks if username was provided in the cookie
        try {
            associateUsername = await cookieHandler.getUsernameFromCookie(event);
        } catch (error) {
            return {
                statusCode: 400,
                body: JSON.stringify("Invalid cookie with username was given"),
            };
        }
        // verify all the data was passed
        if (
            !wasDataIncluded(
                body,
                startDate,
                endDate,
                notes,
                clientName,
                clientPhoneNumber,
                associateUsername
            )
        ) {
            return {
                statusCode: 400,
                body: JSON.stringify("Missing required fields"),
            };
        }
        // check that the username is a valid associate
        if (!(await doesUserExist(associateUsername))) {
            return {
                statusCode: 409,
                body: JSON.stringify("The username is invalid"),
            };
        }
        // convert the dates to unix format
        const startDateValue = new Date(startDate);
        const endDateValue = new Date(endDate);
        // convert to seconds
        const startUnixValue = Math.floor(startDateValue / 1000);
        const endUnixValue = Math.floor(endDateValue / 1000);
        createNewAppointment(
            startUnixValue,
            endUnixValue,
            notes,
            clientName,
            clientPhoneNumber,
            associateUsername
        );
        // TODO: send appointment created message to the client
        return {
            statusCode: 200,
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

async function createNewAppointment(
    startDate,
    endDate,
    notes,
    clientName,
    clientPhoneNumber,
    associateUsername
) {
    const appointmentId = uuidv4();
    const newAppointment = {
        appointmentId: appointmentId, // primary key
        startDate: startDate,
        endDate: endDate,
        notes: notes,
        clientName: clientName,
        clientPhoneNumber: clientPhoneNumber,
        associateUsername: associateUsername,
    };
    const putValue = {
        TableName: appointmentTableName,
        Item: newAppointment,
    };
    await dynamoDB.put(putValue).promise();
}

function wasDataIncluded(
    body,
    startDate,
    endDate,
    notes,
    clientName,
    clientPhoneNumber,
    associateUsername
) {
    return (
        null != body &&
        null != startDate &&
        null != endDate &&
        null != notes &&
        null != clientName &&
        null != clientPhoneNumber &&
        null != associateUsername
    );
}

async function doesUserExist(username) {
    // check if the username already exists
    const existingItem = {
        TableName: associateTableName,
        Key: {
            username: username,
        },
    };
    const foundUser = await dynamoDB.get(existingItem).promise();
    return foundUser.Item != null;
}