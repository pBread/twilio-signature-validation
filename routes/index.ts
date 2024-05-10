import dotenv from "dotenv";
import express from "express";

dotenv.config();

const PORT = process.env.PORT || "3001";

const { AUTH_TOKEN } = process.env;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/post-event", async (req, res) => {
  console.log("=== post-event ===");
  console.log("url\n", req.url);
  console.log("body\n", req.body);
  console.log("headers\n", req.headers);
  console.log("===");

  res.status(200).send({ hello: "world" }).end();
});

app.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});
