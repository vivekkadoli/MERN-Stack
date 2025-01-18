import React from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Gateway of India",
    description:
      "The Gateway of India is a 26-meter (85-foot) arch monument in Mumbai, India that's a top tourist attraction and symbol of the city's history and independence",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSHQujztb-O86piW_-DaD8n4HUMyI2ZH5tcLSFZoqWzM5REv6Z_DJteZNG5Oibcrfbutg&usqp=CAU",
    address: "Apollo Bandar, Colaba, Mumbai, Maharashtra 400001",
    location: {
      lat: 18.9219841,
      lng: 72.8320794,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Shrimant Dagdusheth Halwai Ganapati Temple",
    description:
      "Hindu temple popular with pilgrims, with marble interiors & a golden Ganesh idol.",
    imageUrl:
      "https://lh5.googleusercontent.com/p/AF1QipMWovqKOLvIGdrhhcahVWVNNcyIQaYOVhxjTd6G=w408-h306-k-no",
    address:
      "Ganpati Bhavan, 250, Chhatrapati Shivaji Maharaj Rd, Mehunpura, Budhwar Peth, Pune, Maharashtra 411002",
    location: {
      lat: 18.5164297,
      lng: 73.853558,
    },
    creator: "u2",
  },
];
const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
