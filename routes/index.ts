import dotenv from "dotenv";
import express from "express";
import crypto from "crypto";

dotenv.config();

const PORT = process.env.PORT || "3001";

const { AUTH_TOKEN } = process.env;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/post-event", async (req, res) => {
  console.log("=== post-event ===");
  const twilioSignature = req.headers["x-twilio-signature"];
  const url = "https://pbread.ngrok.io/post-event?hello=world";

  const computedSignature = getExpectedSignature(AUTH_TOKEN, url, req.body);

  console.log("twilioSignature", twilioSignature);
  console.log("computedSignature", computedSignature);
  console.log("do signatures match: ", computedSignature === twilioSignature);
  console.log("url: ", url);
  console.log("body: ", req.body);

  res.status(200).send({ hello: "world" }).end();
});

app.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});

function getExpectedSignature(
  authToken: string,
  url: string,
  params: Record<string, any>
): string {
  const data = Object.keys(params)
    .sort()
    .reduce((acc, key) => acc + toFormUrlEncodedParam(key, params[key]), url);

  console.log("url given to signature", url);

  return crypto
    .createHmac("sha1", authToken)
    .update(Buffer.from(data, "utf-8"))
    .digest("base64");
}

function toFormUrlEncodedParam(
  paramName: string,
  paramValue: string | Array<string>
): string {
  if (paramValue instanceof Array) {
    return Array.from(new Set(paramValue))
      .sort()
      .map((val) => toFormUrlEncodedParam(paramName, val))
      .reduce((acc, val) => acc + val, "");
  }

  return paramName + paramValue;
}
