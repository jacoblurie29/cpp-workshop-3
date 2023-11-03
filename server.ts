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

app.post("/flights", (req, res) => {
  req.body.flight;
});

app.get("/flights/:id", (req, res) => {
  const flightToFind = req.params.id;
  const foundFlight = flights.find((flight) => flight.flightNumber === flightToFind)

  if (foundFlight) {
    res.send(foundFlight);
  }

  else {
    console.log("Sorry, flight not found")
  }
  
});

app.patch("/flights/arrivalTime/:id", (req, res) => {
  const flightToPatch = req.params.id;
  const foundFlight = flights.find((flight) => flight.flightNumber === flightToPatch)
  
  if (foundFlight) { 
    foundFlight.arrivalTime = "never";
    res.send(foundFlight)
  }

  else {
    console.log("Sorry, flight not found");
  }
});

app.delete("/flights/:id", (req, res) => {
  const flightToDelete = req.params.id;
  const newFlights = flights.filter((flight) => flight.flightNumber !== flightToDelete);
  res.send(newFlights);
})

app.listen(3030, () => console.log("Server running on port 3030"));
