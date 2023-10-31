import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import cors from "cors";
import { flightsSeedData, Flight } from "./flightsData";

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
  res.send( flights );
});

app.post("/flights", (req, res) => {
  const newFlight = req.body;
  flights.push(newFlight);
  res.send( flights );
});

app.get("/flights/:id", (req, res) => {
  const id = req.params.id;
  const flight = flights.find((flight: Flight) => {
    if(flight.flightNumber == id){
      return flight;
    };
  });

  res.send( flight );
});

app.patch("/flights/:arrivalTime/:id", (req, res) => {
  const id = req.params.id;
  const arrival = req.params.arrivalTime;
  const flight = flights.find((flight: Flight) => {
    if(flight.flightNumber == id){
      return flight;
    };
  });

  if(flight){
    flight.arrivalTime = arrival;
  }
  res.send({ flight });
});

app.delete("/flights/:id", (req,res) => {
  const id = req.params.id;
  const index: number = flights.findIndex((flight: Flight) => {
      return flight.flightNumber === id;
  });

  delete flights[index];
  res.send( flights );
});

app.listen(3030, () => console.log("Server running on port 3030"));
