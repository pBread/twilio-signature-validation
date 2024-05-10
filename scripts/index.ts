import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const { ACCOUNT_SID, AUTH_TOKEN, CONVO_SVC_SID, PHONE_NUMBERS } = process.env;
const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const convoSid = "CH33d1d6d422f54ae788cd71c15b5f2a6d";

console.log("==script started==");
(async () => {
  let data: { [key: string]: any } = {};

  data.convo = await client.conversations.v1
    .services(CONVO_SVC_SID)
    .conversations(convoSid)
    .messages.create({ body: "Hello", xTwilioWebhookEnabled: "true" });

  console.log(data);
})().then(() => console.log("==script stopped=="));
