export interface Flight {
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  flightDuration: number;
}

export const flightsSeedData: Flight[] = [
  {
    flightNumber: "BA001",
    origin: "London",
    destination: "New York",
    departureTime: "2019-01-01T10:00:00Z",
    arrivalTime: "2019-01-01T18:00:00Z",
    flightDuration: 420,
  },
  {
    flightNumber: "BA002",
    origin: "New York",
    destination: "London",
    departureTime: "2019-01-01T19:00:00Z",
    arrivalTime: "2019-01-02T03:00:00Z",
    flightDuration: 420,
  },
  {
    flightNumber: "BA003",
    origin: "London",
    destination: "Paris",
    departureTime: "2019-01-01T10:00:00Z",
    arrivalTime: "2019-01-01T12:00:00Z",
    flightDuration: 120,
  },
  {
    flightNumber: "BA004",
    origin: "Paris",
    destination: "London",
    departureTime: "2019-01-01T13:00:00Z",
    arrivalTime: "2019-01-01T15:00:00Z",
    flightDuration: 120,
  },
  {
    flightNumber: "BA005",
    origin: "London",
    destination: "Amsterdam",
    departureTime: "2019-01-01T10:00:00Z",
    arrivalTime: "2019-01-01T12:00:00Z",
    flightDuration: 120,
  },
];
