import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import cors from "cors";
import { restaurantsSeedData } from "./flightsData";

// create express app
const app = express();

// configure express app
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

// seed data
let restaurants = restaurantsSeedData;

// routes
app.get("/", (req, res, next) => {
  res.send({ restaurants: restaurants });
});

app.post("/addRestaurant", (req, res) => {
  const newRestaurant = req.body;

  restaurants.push(newRestaurant);

  res.send({ restaurants: restaurants });
});

// initialize server
app.listen(1000, () => console.log("Server running on port 1000"));
