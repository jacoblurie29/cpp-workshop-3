export interface Restaurant {
  id: number;
  name: string;
  city: string;
  price: number;
  starRating: 1 | 2 | 3 | 4 | 5;
}

export const restaurantsSeedData: Restaurant[] = [
  {
    id: 1,
    name: "McDonalds",
    city: "New York",
    price: 1,
    starRating: 1,
  },
  {
    id: 2,
    name: "Burger King",
    city: "New York",
    price: 2,
    starRating: 2,
  },
  {
    id: 3,
    name: "Wendys",
    city: "New York",
    price: 3,
    starRating: 3,
  },
  {
    id: 4,
    name: "Taco Bell",
    city: "New York",
    price: 4,
    starRating: 4,
  },
  {
    id: 5,
    name: "Chick-fil-A",
    city: "New York",
    price: 5,
    starRating: 5,
  },
  {
    id: 6,
    name: "KFC",
    city: "New York",
    price: 1,
    starRating: 1,
  },
  {
    id: 7,
    name: "Popeyes",
    city: "New York",
    price: 2,
    starRating: 2,
  },
];
