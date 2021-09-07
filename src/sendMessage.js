require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const from = process.env.TWILIO_PHONE_NUMBER;
const to = process.env.MY_PHONE_NUMBER;

const sendMessage = async (body) => {
    const message = await client.messages.create({ body, from, to });
    console.log(message.sid);
};

module.exports = sendMessage;
