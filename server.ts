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

app.get("/flights", (req, res) => {
  res.send({ flights: flights });
});

app.post("/flights", (req, res) => {
  let newFlight = req.body.flight;
  flights.push(newFlight);
  res.send({ flights: flights });
});

app.get("/flights/:flightNumber", (req, res) => {
  let result = flights.find((flight: Flight) => {
    return req.params.flightNumber === flight.flightNumber;
  });
  res.send({ flight: result });
});

app.patch("/flights/arrivalTime/:flightNumber", (req, res) => {
  const newFlightArrivalTime = req.body.newTime;

  if (!newFlightArrivalTime) {
    res.status(400).send({ message: "You forgot the time!" });
  }

  flights.find((flight: Flight) => {
    if (flight.flightNumber === req.params.flightNumber) {
      flight.arrivalTime = newFlightArrivalTime;
    }
  });
  res.send({ flights: flights });
});

app.delete("/flights/:flightNumber", (req, res) => {
  // so why doesn't this work?
  let result = flights.filter((flight: Flight) => {
    flight.flightNumber != req.params.flightNumber;
    console.log(flight.flightNumber + " " + req.params.flightNumber);
  });

  /*

  Currently it is returning [] regardless of the input

  The reason this doesn't work is because the predicate function (the function in the filter function) is look for a returned true or false
  for what ever you do in their. This brings up the topic the construction of functions in Typescript.

  If the interior of a function has > 1 line you surround it with curly braces and explicitly write the word: 'return ...'

  For example:

  let result = flights.filter((flight: Flight) => {
    console.log(flight.flightNumber + " " + req.params.flightNumber);
    return flight.flightNumber != req.params.flightNumber;
  });

  If the interior of a function has just one line, you can use parenthesis and the function will automatically assume
  the result of the one line is returned value. For example:
  
  let result = flights.filter((flight: Flight) => ( flight.flightNumber != req.params.flightNumber ));

  Essentially your function was not returning anything for the comparison. Since true or false was not being returned,
  the function was actually returning 'undefined' for each comparison. Undefined is 'falsy' which means it is a value that when
  evaluated as a boolean, acts as false even though it is not explicitly the value false.

  Since the function returned false for every value, and filter keeps every value that returns true in the predicate,
  an empty array was returned.

  TL;DR (Too long, don't read - I'll use this acronym a lot to summarize a lot of explanation)
  Functions in typescript either have curly braces and literally say 'return' or have parenthesis and a single line that evaluates as true/false

  */

  result.forEach(function (element) {
    console.log(element.flightNumber);
  });

  res.send({ flights: result });
});

app.listen(3030, () => console.log("Server running on port 3030"));
