import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import MenuCard from "../menu/MenuCard";
import { useNavigate } from "react-router-dom";
import { appUrl } from "../../services/auth.service";

const PlaneCard = (props) => {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();
  const { warplane } = props;

  const onMouseEnterCard = () => {
    setIsHover(true);
  };

  const onMouseLeaveCard = () => {
    setIsHover(false);
  };

  return (
    <Card
      className="mt-6 w-96 rounded-lg hover:cursor-pointer"
      onMouseEnter={onMouseEnterCard}
      onMouseLeave={onMouseLeaveCard}
      onClick={() => navigate(`/avion/${warplane.id}`)}
    >
      <CardHeader color="blue-gray" className="relative h-56 rounded-lg">
        <img
          src={appUrl + warplane.contentUrl}
          alt="média de l'avion"
          layout="fill"
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        <MenuCard isHover={isHover} warplaneId={warplane.id} />
      </CardHeader>
      <CardBody className="rounded-lg">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {warplane.name}
        </Typography>
        <Typography>Armement : {warplane.armament}</Typography>
      </CardBody>
    </Card>
  );
};

export default PlaneCard;
