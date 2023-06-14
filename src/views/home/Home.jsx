import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Chip,
  IconButton,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import PlaneCard from "../../components/cards/PlaneCard";
import { Link } from "react-router-dom";
import {
  apiInstance,
  getCurrentUser,
  CurrentUserId,
} from "../../services/auth.service";

const useUserWarplanes = () => {
  const [warplanes, setWarplanes] = useState(null);
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
          `/users/${userId}/warplanes?page=${active}`,
          {
            headers: {
              accept: `application/ld+json;`,
            },
          }
        );
        if (!ignore) {
          setWarplanes(response.data["hydra:member"]);
          setTotalPages(
            response.data["hydra:view"]["hydra:last"].split("=")[1]
          );
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
    warplanes,
    error,
    renderPageButtons,
    prev,
    next,
    active,
    totalPages,
  };
};

const WarplanesList = () => {
  const {
    warplanes,
    error,
    renderPageButtons,
    prev,
    next,
    active,
    totalPages,
  } = useUserWarplanes();

  if (error) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">{error.message}</h1>
      </div>
    );
  }

  if (warplanes === null) {
    return (
      <div className="text-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <>
      {warplanes.length === 0 ? (
        <div className="text-center">
          <h1 className="text-2xl font-normal">
            Nous avons perdu la communication avec la tour de contrôle. Il n'y a
            aucun avion à disposition. Ajoute en un !
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {warplanes.map((warplane) => (
            <PlaneCard key={warplane.id} warplane={warplane} />
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
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
        </Button>
        <div className="flex items-center gap-2">{renderPageButtons()}</div>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2"
          onClick={next}
          disabled={active === totalPages}
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

const useUserInformation = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getCurrentUser();
        if (!userData) {
          throw new Error("No user id");
        }
        setCurrentUser(userData);
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des données de l'utilisateur :",
          error
        );
        setError(error);
      }
    };
    fetchData();
  }, []);

  return { currentUser, error };
};

const UserDisplayName = () => {
  const { currentUser, error } = useUserInformation();

  if (error) {
    return (
      <div className="flex items-center">
        <Typography variant="h1" className="text-2xl mr-3">
          {error.message}
        </Typography>
      </div>
    );
  }

  if (currentUser === null) {
    return (
      <div className="flex items-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <Chip
      value={currentUser?.username ? currentUser?.username : ""}
      variant="ghost"
      className="text-2xl mr-3"
    />
  );
};

const Home = () => {
  return (
    <main className="container mx-auto px-4">
      <section className="section-home-view">
        <div className="flex items-center">
          <Typography variant="h1" className="text-3xl font-normal mr-3">
            Bonjour
          </Typography>
          <UserDisplayName />
          <Typography variant="h1" className="text-3xl">
            🫡
          </Typography>
        </div>
      </section>
      <section className="section-my-plane mb-10">
        <div className="header-warplanes">
          <div>
            <h2>Mes avions</h2>
          </div>
          <Link to={"/nouvel-avion"}>
            <Button
              variant="outlined"
              size="lg"
              color="light-blue"
              className="flex items-center gap-3 radius-inherit hover:bg-gradient-to-bl hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:opacity-100"
            >
              <PlusIcon strokeWidth={2} className="h-6 w-6" /> Nouvel avion
            </Button>
          </Link>
        </div>
        <WarplanesList />
      </section>
      <section className="section-my-plane mb-10">
        <div className="header-warplanes">
          <div>
            <h2>Mes plan de vol</h2>
          </div>
          <Link to={"/nouveau-plan-de-vol"}>
            <Button
              variant="outlined"
              size="lg"
              color="light-blue"
              className="flex items-center gap-3 radius-inherit hover:bg-gradient-to-bl hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:opacity-100"
            >
              <PlusIcon strokeWidth={2} className="h-6 w-6" /> Nouveau plan de
              vol
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
