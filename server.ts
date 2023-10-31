import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import cors from "cors";
import { Flight, flightsSeedData } from "./flightsData";

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

app.post("/flights", (req, res) => {
  const newFlight = req.body;
  flights.push(newFlight);
  res.send(flights);
});

app.get("/flights/:flightNumber", (req, res) => {
  const flightNumber = req.params.flightNumber;
  const flight = flights.find(
    (flight: Flight) => flight.flightNumber === flightNumber
  );
  res.send(flight);
});

app.patch("/flights/arrivalTime/:id", (req, res) => {
  const flightId = req.params.id;
  const updatedFlightArrivalTime = req.body.arrivalTime;
  const flight = flights.find(
    (flight: Flight) => flight.flightNumber === flightId
  );
  if (flight) {
    flight.arrivalTime = updatedFlightArrivalTime;
  }
  res.send(flight);
});

app.delete("/flights/:flightNumber", (req, res) => {
  const flightNumber = req.params.flightNumber;
  flights = flights.filter(
    (flight: Flight) => flight.flightNumber !== flightNumber
  );
  res.send(flights);
});

app.listen(3032, () => console.log("Server running on port 3032"));
