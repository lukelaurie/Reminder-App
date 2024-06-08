import AWS from "aws-sdk";
import cookieHandler from "get_username_from_cookie";

let awsConfig = {
    region: "us-east-2",
    endpoint: "http://dynamodb.us-east-2.amazonaws.com",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};
AWS.config.update(awsConfig);

let dynamoDB = new AWS.DynamoDB.DocumentClient();
const appointmentTableName = "appointment";

export const handler = async (event) => {
    try {
        // Retrieve the data from the request
        const body = JSON.parse(event.body);
        const appointmentId = body.appointmentId;
        // checks if user has authorization to delete
        try {
            await cookieHandler.getUsernameFromCookie(event);
        } catch (error) {
            return {
                statusCode: 400,
                body: "Invalid cookie was provided"
            };
        }
        // verify all the data was passed
        if (!body || !appointmentId) {
            return {
                statusCode: 400,
                body: "Missing required fields"
            };
        }
        await deleteAppointment(appointmentId);
        // TODO: send appointment deleted message to client
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

async function deleteAppointment(appointmentId) {
    const deleteValue = {
        TableName: appointmentTableName,
        Key: {
            appointmentId: appointmentId
        }
    };
    await dynamoDB.delete(deleteValue).promise();
}