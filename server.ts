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

app.get("/flights", (req, res) => {
  res.send(flights);
});

app.post("/flights", (req, res) =>{
  const newFlight = req.body;
  flights.push(newFlight);
  res.send(flights);
});

app.get("/flights/:flightNumber", (req, res) => {
  const flightNumber = req.params.flightNumber;
  res.send(flights.find((flight) => flight.flightNumber === flightNumber));
});

app.patch("/flights/arrivalTime/:id", (req, res) => {
    const arrivalTime = req.params.id;
    const flight = flights.find((flight) => flight.arrivalTime === arrivalTime);
});

app.delete("/flights/:id", (req, res) => {
  const flightNumber = req.params.id;
  flights = flights.filter((flight) => flight.flightNumber !== flightNumber);
});

app.listen(3030, () => console.log("Server running on port 3030"));
