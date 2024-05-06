import express from "express";
export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(204).send({ version: "1.0" });
  console.log("run");
});
