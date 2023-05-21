import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Chip, Spinner, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import PlaneCard from "../../components/cards/PlaneCard";
import { Link } from "react-router-dom";
import { getCurrentUser, getCurrentUserId } from "../../services/auth.service";
import { getWarplanesByUserId } from "../../services/apiRequest.js";

const Home = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const [userWarplanes, setUserWarplanes] = useState([]);
  const userId = getCurrentUserId();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWarplanes = async () => {
      setLoading(true);
      const getUserWarplanes = await getWarplanesByUserId(userId);
      if (getUserWarplanes !== false) {
        setUserWarplanes(getUserWarplanes);
        setLoading(false);
      } else {
        console.log("Aucun avion relié à cette utilisateur");
      }
    };
    async function fetchData() {
      try {
        const userData = await getCurrentUser();
        if (userData !== false) {
          setCurrentUser(userData); // Les données de l'utilisateur sont affichées ici
        } else {
          console.log("L'identifiant de l'utilisateur n'est pas disponible.");
        }
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des données de l'utilisateur :",
          error
        );
      }
    }
    fetchData();
    fetchWarplanes();
  }, []);

  console.log(userWarplanes);

  return (
    <main className="container mx-auto px-4">
      <section className="section-home-view">
        <div className="flex items-center">
          <Typography variant="h1" className="text-3xl font-normal mr-3">
            Bonjour
          </Typography>
          <Chip
            value={currentUser.username ? currentUser.username : ""}
            variant="ghost"
            className="text-2xl mr-3"
          />
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
        <div className="grid grid-cols-3 gap-3">
          {loading ? (
            <Spinner className="h-8 w-8" />
          ) : (
            userWarplanes.map((warplane) => {
              return <PlaneCard key={warplane._id} warplane={warplane} />;
            })
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
