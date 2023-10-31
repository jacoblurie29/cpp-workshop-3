import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import cors from "cors";
import { flightsSeedData } from "./flightsData";
import { Flight } from "./flightsData";

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

//returns all the flights in the database
app.get("/flights", (req, res) => {
  res.send(flights);
});

//creates a new flight in the database 
app.post("/flights", (req, res) => {
  let flight = req.body;
  flights.push(flight);
  res.send(flights);
});

//returns a flight with a given id 
app.get("/flights/:id", (req, res) => {
  let returnVal = flights.find(flight => flight.flightNumber === req.params.id);
  res.send(returnVal);
});

//update's a flight's arrival time 
app.patch("/flights/arrivalTime/:id", (req, res) => {
  let index = flights.findIndex(flight => flight.flightNumber === req.params.id);
  flights[index].arrivalTime = "updated";
  res.send(flights[index]);
});

//deletes a flight with a given id
app.delete("/flights/:id", (req, res) => {
  let index = flights.findIndex(flight => flight.flightNumber === req.params.id);
  flights.splice(index, 1);
  res.send(flights);
});

app.listen(3030, () => console.log("Server running on port 3030"));
