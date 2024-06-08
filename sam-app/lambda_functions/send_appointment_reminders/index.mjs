import { sendTextMessage } from 'send-text-message/index.mjs';


export const handler = async (event) => {
    try {
        await sendTextMessage(
            "+15204058935",
            "THis is a test message being sent to myself"
        );
        return {
            statusCode: 200,
            body: JSON.stringify("text sent"),
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify("Error sending the text message"),
        };
    }
};
