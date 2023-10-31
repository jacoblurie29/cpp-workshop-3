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
  res.send({flights: flights})
})

app.post("/flights", (req, res) => {
  let newFlight: Flight = req.body.flight
  flights.push(newFlight)
  res.send({flights: flights})
})

app.get("/flights/:id", (req, res) => {
  let id: string = req.params.id
  console.log("\n HERE: ", id)
  console.log(flights)
  let resFlight = flights.find(f => f.flightNumber === id)
  if (resFlight){
    res.send({flight: resFlight})
  } else {
    res.status(401).send({message: `ERROR: FLIGHT WITH ID ${id} NOT FOUND`})
  }
})

app.put("/flights/:id", (req, res) => {
  let id = req.params.id
  let newFlight = req.body.flight
  let resFlight = flights.find(f => f.flightNumber === id)
  if (resFlight){
    resFlight = newFlight
    res.send({ updatedFlight: resFlight})
  } else {
    res.status(401).send({message: `ERROR: FLIGHT WITH ID ${id} NOT FOUND`})
  }
})

app.delete("/flights/:id", (req, res) => {
  let id = req.params.id
  let lenBefore = flights.length
  flights = flights.filter(f => f.flightNumber !== id)
  if(flights.length === lenBefore){
    res.status(401).send({message: `ERROR: FLIGHT WITH ID ${id} NOT FOUND`})
  } else {
    res.send({message: `successfully deleted flight with id ${id}`})
  }
})

app.listen(3030, () => console.log("Server running on port 3030"));
