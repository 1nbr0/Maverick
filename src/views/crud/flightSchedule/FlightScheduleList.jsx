import { Button, Spinner } from "flowbite-react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { CurrentUserId, apiInstance } from "../../../services/auth.service";
import FlightScheduleCard from "../../../components/cards/FlightScheduleCard";

const useUserFlightSchedules = () => {
  const [flightSchedules, setFlightSchedules] = useState(null);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchWarplanes = async () => {
      try {
        const userId = CurrentUserId();
        if (!userId) {
          throw new Error("No user id");
        }
        const response = await apiInstance.get(
          `/flight_schedule/users/${userId}?page=${active}`,
          {
            headers: {
              accept: `application/ld+json;`,
            },
          }
        );
        if (!ignore) {
          setFlightSchedules(response.data["hydra:member"]);
          if (response.data["hydra:view"]) {
            setTotalPages(
              response.data["hydra:view"]["hydra:last"].split("=")[1]
            );
          } else {
            setTotalPages(1);
          }
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    let ignore = false;

    fetchWarplanes();

    return () => {
      ignore = true;
    };
  }, [active]);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: active === index ? "blue" : "blue-gray",
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active === totalPages) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  const renderPageButtons = () => {
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <IconButton key={i} {...getItemProps(i)}>
          {i}
        </IconButton>
      );
    }

    return buttons;
  };

  return {
    flightSchedules,
    error,
    renderPageButtons,
    prev,
    next,
    active,
    totalPages,
  };
};

const FlightScheduleList = () => {
  const {
    flightSchedules,
    error,
    renderPageButtons,
    prev,
    next,
    active,
    totalPages,
  } = useUserFlightSchedules();

  if (error) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">{error.message}</h1>
      </div>
    );
  }

  if (flightSchedules === null) {
    return (
      <div className="text-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <>
      {flightSchedules.length === 0 ? (
        <div className="text-center">
          <h1 className="text-2xl font-normal">
            Nous avons perdu la communication avec la tour de contrôle. Il n'y a
            aucun plan de vol à disposition. Ajoute en un !
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {flightSchedules.map((flightSchedule) => (
            <FlightScheduleCard
              key={flightSchedule.id}
              flightSchedule={flightSchedule}
            />
          ))}
        </div>
      )}
      <div className="flex justify-center items-center gap-4">
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2"
          onClick={prev}
          disabled={active === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Précedent
        </Button>
        <div className="flex items-center gap-2">{renderPageButtons()}</div>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2"
          onClick={next}
          disabled={active === totalPages}
        >
          Suivant
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export default FlightScheduleList;
