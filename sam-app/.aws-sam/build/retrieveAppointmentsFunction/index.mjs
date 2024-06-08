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
        const startDateRange = body.startDateRange;
        const endDateRange = body.endDateRange;
        if (!startDateRange || !endDateRange) {
            return {
                statusCode: 400,
                body: JSON.stringify("Missing required fields")
            };
        }
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
        // convert the date ranges into unix time
        const startDateValueRange = new Date(startDateRange);
        const endDateValueRange = new Date(endDateRange);
        const startUnixValueRange = Math.floor(startDateValueRange / 1000);
        const endUnixValueRange = Math.floor(endDateValueRange / 1000);
        // get all of the appointments with the associated username
        const associatedppointments = await getAllAppointments(
            associateUsername,
            startUnixValueRange,
            endUnixValueRange
        );
        return {
            statusCode: 200,
            body: JSON.stringify(associatedppointments),
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify("An error has occured"),
        };
    }
};

function getAllAppointments(
    associateUsername,
    startUnixValueRange,
    endUnixValueRange
) {
    return new Promise((resolve, reject) => {
        // get the param that is used to qury the database
        const params = {
            TableName: appointmentTableName,
            IndexName: "associateUsername-startDate-index",
            KeyConditionExpression:
                "associateUsername = :associateUsername AND startDate BETWEEN :startRange AND :endRange",
            // Defines the attributes to be used in the query
            ExpressionAttributeValues: {
                ":associateUsername": associateUsername,
                ":startRange": startUnixValueRange,
                ":endRange": endUnixValueRange
            }
        };
        // query the database for all of the items
        dynamoDB.query(params, (err, data) => {
            if (err) {
                console.log("Unable to query the database");
                reject(err);
            } else {
                resolve(data.Items);
            }
        });
    });
}
