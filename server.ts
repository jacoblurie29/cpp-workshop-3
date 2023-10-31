import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import cors from "cors";
import { flightsSeedData } from "./flightsData";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

// seed data
let flights = flightsSeedData;

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.listen(3030, () => console.log("Server running on port 3030"));
