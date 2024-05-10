import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const { ACCOUNT_SID, AUTH_TOKEN, CONVO_SVC_SID, PHONE_NUMBERS } = process.env;
const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

console.log("==script started==");
(async () => {
  let data: { [key: string]: any } = {};

  console.log(data);
})().then(() => console.log("==script stopped=="));
