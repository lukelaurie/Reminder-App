import AWS from "aws-sdk";
import { getUsernameFromCookie } from "get_username_from_cookie/index.mjs";
import { v4 as uuidv4 } from "uuid";

let awsConfig = {
    region: "us-east-2",
    endpoint: "http://dynamodb.us-east-2.amazonaws.com",
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
};
AWS.config.update(awsConfig);

let dynamoDB = new AWS.DynamoDB.DocumentClient();
const appointmentTableName = "appointment";
const associateTableName = "associates";

export const handler = async (event) => {
    try {
        // Retrieve the data from the request
        const body = JSON.parse(event.body);
        const startDate = body.startDate;
        const endDate = body.endDate;
        const notes = body.notes;
        const clientName = body.clientName;
        const clientPhoneNumber = body.clientPhoneNumber;
        const appointmentId = body.appointmentId;
        let associateUsername;
        // checks if username was provided in the cookie
        try {
            associateUsername = await getUsernameFromCookie(event);
        } catch (error) {
            return {
                statusCode: 400,
                body: "Invalid cookie was provided"
            };
        }
        // verify all the data was passed
        if (!body || !startDate || !endDate || !notes || !clientName || !clientPhoneNumber || !associateUsername) {
            return {
                statusCode: 400,
                body: "Missing required fields"
            };
        }
        // check that the username is a valid associate
        if (!(await doesUserExist(associateUsername))) {
            return {
                statusCode: 409,
                body: "The username is invalid"
            };
        }
        // convert the dates to unix format
        const startDateValue = new Date(startDate);
        const endDateValue = new Date(endDate);
        // convert to seconds
        const startUnixValue = Math.floor(startDateValue / 1000);
        const endUnixValue = Math.floor(endDateValue / 1000);
        await createNewAppointment(
            startUnixValue,
            endUnixValue,
            notes,
            clientName,
            clientPhoneNumber,
            associateUsername,
            appointmentId
        );
        // TODO: send appointment created message to the client
        return {
            statusCode: 200,
            body: "valid"
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: "An error has occured"
        };
    }
};

async function createNewAppointment(
    startDate,
    endDate,
    notes,
    clientName,
    clientPhoneNumber,
    associateUsername,
    appointmentId
) {
    // checks if just updating or creating new appt
    if (!appointmentId) {
        appointmentId = uuidv4();
    }
    const newAppointment = {
        appointmentId: appointmentId,
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