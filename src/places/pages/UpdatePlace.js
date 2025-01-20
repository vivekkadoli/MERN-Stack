import React from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./PlaceForm.css";

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

const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={() => {}}
        value={identifiedPlace.title}
        valid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={() => {}}
        value={identifiedPlace.description}
        valid={true}
      />
      <Button type="submit" disabled={true}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
