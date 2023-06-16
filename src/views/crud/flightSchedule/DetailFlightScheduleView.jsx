import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiInstance, baseUrl } from "../../../services/auth.service";
import {
  Timeline,
  TimelineBody,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  Typography,
} from "@material-tailwind/react";
import { Spinner } from "flowbite-react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import ArrivalFlight from "../../../assets/icons/ArrivalFlight";
import DepartureFlight from "../../../assets/icons/DepartureFlight";

const useUserFlightScheduleDetail = () => {
  const [flightSchedule, setFlightSchedule] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchFlightSchedule = async () => {
      try {
        const response = await apiInstance.get(
          `/flight_schedules/${params.id}`
        );
        if (!ignore) {
          setFlightSchedule(response.data);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };
    let ignore = false;
    fetchFlightSchedule();
    return () => {
      ignore = true;
    };
  }, [params.id]);

  return { flightSchedule, error };
};

const FlightScheduleTimeline = () => {
  const { flightSchedule, error } = useUserFlightScheduleDetail();

  if (error) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">{error.message}</h1>
      </div>
    );
  }

  if (flightSchedule === null) {
    return (
      <div className="text-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  const flightScheduleArrivalTime = new Date(flightSchedule.arrivalTime);
  flightScheduleArrivalTime.setHours(flightScheduleArrivalTime.getHours() + 2);

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
  flightScheduleDepartureTime.setHours(
    flightScheduleDepartureTime.getHours() + 2
  );

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

  return (
    <>
      <div className="flex flex-row flex-wrap items-center gap-8">
        <Typography variant="h1" className="text-3xl font-normal">
          {flightSchedule.name}
        </Typography>
        <Typography variant="h2" className="text-2xl font-normal">
          N° {flightSchedule.idFlight}
        </Typography>
      </div>
      <div className="w-full">
        <Timeline>
          <TimelineItem>
            <TimelineConnector />
            <TimelineHeader>
              <TimelineIcon className="p-2">
                <DepartureFlight className="h-5 w-5 fill-white" />
              </TimelineIcon>
              <Typography variant="h5" color="blue-gray">
                {flightSchedule.departureTrack.airport.name}
              </Typography>
              <Typography variant="lead" color="blue-gray">
                {departureDateTime}
              </Typography>
            </TimelineHeader>
            <TimelineBody className="pt-4 pl-5 pb-10">
              <div className="flex flex-row flex-wrap gap-16">
                <Typography color="gray" className="font-normal text-gray-600">
                  {"Latitude : "}
                  {flightSchedule.departureTrack.airport.latitude}
                  <br />
                  {"Longitude : "}
                  {flightSchedule.departureTrack.airport.longitude} <br />
                  {" Nombre de piste : "}
                  {flightSchedule.departureTrack.airport.nbrTrack}
                </Typography>
                <Typography color="gray" className="font-normal text-gray-600">
                  {"Piste : "}
                  {flightSchedule.departureTrack.idTrackNumber}
                  <br />
                  {"Nom QFU : "}
                  {flightSchedule.departureTrack.trackNameQfu} <br />
                  {" Terminal : "}
                  {flightSchedule.departureTrack.terminalNumber}
                </Typography>
              </div>
            </TimelineBody>
          </TimelineItem>
          <TimelineItem>
            <TimelineHeader>
              <TimelineIcon className="p-2">
                <ArrivalFlight className="h-5 w-5 fill-white" />
              </TimelineIcon>
              <Typography variant="h5" color="blue-gray">
                {flightSchedule.arrivalTrack.airport.name}
              </Typography>
              <Typography variant="lead" color="blue-gray">
                {arrivalDateTime}
              </Typography>
            </TimelineHeader>
            <TimelineBody className="pt-4 pl-5 pb-10">
              <div className="flex flex-row flex-wrap gap-16">
                <Typography color="gray" className="font-normal text-gray-600">
                  {"Latitude : "}
                  {flightSchedule.arrivalTrack.airport.latitude}
                  <br />
                  {"Longitude : "}
                  {flightSchedule.arrivalTrack.airport.longitude} <br />
                  {" Nombre de piste : "}
                  {flightSchedule.arrivalTrack.airport.nbrTrack}
                </Typography>
                <Typography color="gray" className="font-normal text-gray-600">
                  {"Piste : "}
                  {flightSchedule.arrivalTrack.idTrackNumber}
                  <br />
                  {"Nom QFU : "}
                  {flightSchedule.arrivalTrack.trackNameQfu} <br />
                  {" Terminal : "}
                  {flightSchedule.arrivalTrack.terminalNumber}
                </Typography>
              </div>
            </TimelineBody>
          </TimelineItem>
        </Timeline>
      </div>
      <figure className="relative h-3/4 w-11/12">
        <img
          className="h-full w-full rounded-xl"
          src={baseUrl + flightSchedule.assignedPlane.contentUrl}
          alt="illustration de l'avion"
        />
        <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
          <div>
            <Typography variant="h5" color="blue-gray">
              {flightSchedule.assignedPlane.name}
            </Typography>
            <Typography color="gray" className="mt-2 font-normal">
              {flightSchedule.assignedPlane.armament}
            </Typography>
          </div>
        </figcaption>
      </figure>
    </>
  );
};

const FlightScheduleDetail = () => {
  return (
    <>
      <div className="grid gap-4 pl-40">
        <div className="flex flex-row justify-start">
          <Link to="/">
            <Typography className="text-l font-normal flex flex-row items-center mb-4">
              <ChevronLeftIcon strokeWidth={2} className="h-4 w-4" /> Retour
            </Typography>
          </Link>
        </div>
        <div className="flex flex-col gap-12">
          <FlightScheduleTimeline />
        </div>
      </div>
    </>
  );
};

const DetailFlightScheduleView = () => {
  return (
    <>
      <FlightScheduleDetail />
    </>
  );
};

export default DetailFlightScheduleView;
