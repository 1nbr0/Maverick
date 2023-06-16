import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  CardFooter,
  Tooltip,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import FlightScheduleIcon from "../../assets/icons/FlightScheduleIcon";
import DepartureFlight from "../../assets/icons/DepartureFlight";
import ArrivalFlight from "../../assets/icons/ArrivalFlight";
import FlightScheduleMenuCard from "../menu/FlightScheduleMenuCard";

const FlightScheduleCard = (props) => {
  const { flightSchedule } = props;
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  const flightScheduleArrivalTime = new Date(flightSchedule.arrivalTime);
  const arrivalDate = new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(flightScheduleArrivalTime);

  const arrivalTime = new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(flightScheduleArrivalTime);

  const arrivalDateTime = `${arrivalDate} - ${arrivalTime}`;

  const flightScheduleDepartureTime = new Date(flightSchedule.departureTime);
  const departureDate = new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(flightScheduleDepartureTime);

  const departureTime = new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(flightScheduleDepartureTime);

  const departureDateTime = `${departureDate} - ${departureTime}`;

  const onMouseEnterCard = () => {
    setIsHover(true);
  };

  const onMouseLeaveCard = () => {
    setIsHover(false);
  };

  return (
    <Card
      className="w-full max-w-[26rem]"
      onMouseEnter={onMouseEnterCard}
      onMouseLeave={onMouseLeaveCard}
    >
      <FlightScheduleMenuCard
        isHover={isHover}
        flightScheduleId={flightSchedule.id}
      />
      <CardBody>
        <div className="flex flex-row flex-wrap gap-4">
          <FlightScheduleIcon className="fill-green-500" />
          <Typography
            variant="h5"
            color="light-blue"
            className="uppercase mb-4"
          >
            {flightSchedule.name}
          </Typography>
        </div>
        <div className="my-3 flex items-center justify-between">
          <Typography variant="h6" color="blue-gray">
            {flightSchedule.assignedPlane.name}
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            N°
            <Typography as="span" color="amber" className="font-bold">
              {flightSchedule.idFlight}
            </Typography>
          </Typography>
        </div>

        <div className="grid gap-2">
          <div className="flex flex-row flex-wrap items-center">
            <Tooltip placement="top-start" content={departureDateTime}>
              <span className="cursor-pointer mr-4 rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70">
                <DepartureFlight className="h-5 w-5 fill-light-blue-500" />
              </span>
            </Tooltip>
            <Typography color="gray" className="font-normal mt-9">
              {flightSchedule.departureTrack.airport.name}
              <br /> {" Piste : "}
              {flightSchedule.departureTrack.trackNameQfu} <br />
              {" Terminal : "}
              {flightSchedule.departureTrack.terminalNumber}
            </Typography>
          </div>
          <div className="flex flex-row flex-wrap items-center">
            <Tooltip placement="top-start" content={arrivalDateTime}>
              <span className="cursor-pointer mr-4 rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70">
                <ArrivalFlight className="h-5 w-5 fill-light-blue-500" />
              </span>
            </Tooltip>
            <Typography color="gray" className="font-normal mt-9">
              {flightSchedule.arrivalTrack.airport.name}
              <br /> {" Piste : "}
              {flightSchedule.arrivalTrack.trackNameQfu} <br />
              {" Terminal : "}
              {flightSchedule.arrivalTrack.terminalNumber}
            </Typography>
          </div>
        </div>
      </CardBody>
      <CardFooter className="pt-3 flex flex-row flex-wrap justify-between items-end">
        <Button
          variant="outlined"
          color="light-blue"
          onClick={() => navigate(`/plan-de-vol/${flightSchedule.id}`)}
          className="flex items-center gap-2 hover:bg-gradient-to-bl hover:from-cyan-500 hover:to-blue-500 hover:text-white"
        >
          En savoir plus
          <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FlightScheduleCard;
