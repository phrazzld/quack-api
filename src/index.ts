import express from "express";
import bodyParser from "body-parser";
import {
  Answer,
  containsArgument,
  getCoreArgument,
  writeCounterargument,
} from "./openai";

const app = express();
app.use(bodyParser.json());

app.get("/", async (_req, res) => {
  // Return hello world
  res.send("Hello World!");
});

// Define a POST route to analyze text
app.post("/analyze", async (req, res) => {
  const { text } = req.body;
  const isArgument = await containsArgument(text);
  if (isArgument === Answer.No) {
    res.send("This text does not make an argument.");
  } else {
    const coreArgument = await getCoreArgument(text);
    const counterArgument = await writeCounterargument(text);
    res.send({
      coreArgument,
      counterArgument,
    });
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
