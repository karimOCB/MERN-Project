import express from "express";
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello Worldciro!");
});

app.listen(port, () => {
console.log(`Server running on port https://localhost:${port}`);
});
