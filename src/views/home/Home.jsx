import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Chip, Spinner, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import PlaneCard from "../../components/cards/PlaneCard";
import { Link } from "react-router-dom";
import {
  apiInstance,
  getCurrentUser,
  getCurrentUserId,
} from "../../services/auth.service";
import { getWarplanesByUserId } from "../../services/apiRequest.js";

const useUserWarplanes = () => {
  const [warplanes, setWarplanes] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWarplanes = async () => {
      try {
        const userId = getCurrentUserId();
        if (!userId) {
          throw new Error("No user id");
        }
        const response = await apiInstance.get(`/users/${userId}/warplanes`);
        setWarplanes(response.data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };
    fetchWarplanes();
  }, []);

  return { warplanes, error };
};

const WarplanesList = () => {
  const { warplanes, error } = useUserWarplanes();

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
          <h1 className="text-2xl font-bold">
            Aucun avion relié à cet utilisateur
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {warplanes.map((warplane) => (
            <PlaneCard key={warplane.id} warplane={warplane} />
          ))}
        </div>
      )}
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
        <Typography variant="h1" className="text-2xl font-normal mr-3">
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
    <>
      <div className="flex items-center">
        <Typography variant="h1" className="text-3xl font-normal mr-3">
          Bonjour
        </Typography>
        <Chip
          value={currentUser?.username ? currentUser?.username : ""}
          variant="ghost"
          className="text-2xl mr-3"
        />
        <Typography variant="h1" className="text-3xl">
          🫡
        </Typography>
      </div>
    </>
  );
};

const Home = () => {
  return (
    <main className="container mx-auto px-4">
      <section className="section-home-view">
        <UserDisplayName />
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
    </main>
  );
};

export default Home;
