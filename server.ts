import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import cors from "cors";
import { Flight, flightsSeedData } from "./flightsData";
import { resourceLimits } from "worker_threads";

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

app.get("/flights", (req,res) => {
  res.send({flights : flights});
});

app.post("/flights", (req, res) => {
  let newFlight = req.body.flight;
  flights.push(newFlight);
  res.send({flights : flights});
})

app.get("/flights/:flightNumber", (req, res) => {
    let result = flights.find((flight: Flight) => {
      return req.params.flightNumber === flight.flightNumber
    })
    res.send({flight: result});
})

app.patch("/flights/arrivalTime/:flightNumber", (req, res) => {
    const newFlightArrivalTime = req.body.newTime;

    if(!newFlightArrivalTime) {
      res.status(400).send({ message: "You forgot the time!" })
    }

    flights.find((flight:Flight) => {
      if(flight.flightNumber === req.params.flightNumber){
        flight.arrivalTime = newFlightArrivalTime;
      }
    })
    res.send({flights: flights});
})

app.delete("/flights/:flightNumber", (req, res) => {
  let result = flights.filter((flight: Flight) => {
      flight.flightNumber != req.params.flightNumber;
      console.log(flight.flightNumber + " " + req.params.flightNumber);
    })
    console.log("length " + result.length)
    
    result.forEach(function (element) {
      console.log(element.flightNumber);
    })

    res.send({flights: result});
})

app.listen(3030, () => console.log("Server running on port 3030"));
