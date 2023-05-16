import React, { useState } from "react";
import imagePlaneCard from "../../assets/images/sunset-top-gun-2.jpeg";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import MenuCard from "../menu/MenuCard";
import { useNavigate } from "react-router-dom";

const PlaneCard = () => {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  const onMouseEnterCard = () => {
    setIsHover(true);
  };

  const onMouseLeaveCard = () => {
    setIsHover(false);
  };

  const onHandleClickCard = () => {
    navigate("/avion/detail/1");
  };

  return (
    <Card
      className="mt-6 w-96 rounded-lg hover:cursor-pointer"
      onMouseEnter={onMouseEnterCard}
      onMouseLeave={onMouseLeaveCard}
      onClick={onHandleClickCard}
    >
      <CardHeader color="blue-gray" className="relative h-56 rounded-lg">
        <img src={imagePlaneCard} alt="img-blur-shadow" layout="fill" />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        <MenuCard isHover={isHover} />
      </CardHeader>
      <CardBody className="rounded-lg">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Rafale M
        </Typography>
        <Typography>
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk.
        </Typography>
      </CardBody>
    </Card>
  );
};

export default PlaneCard;
