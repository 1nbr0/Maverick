import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Chip, Typography } from "@material-tailwind/react";
import React from "react";
import PlaneCard from "../../components/cards/PlaneCard";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="container mx-auto px-4">
      <section className="section-home-view">
        <div className="flex items-center">
          <Typography variant="h1" className="text-3xl font-normal mr-3">
            Bonjour
          </Typography>
          <Chip value="User" variant="ghost" className="text-2xl mr-3" />
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
        <div>
          <PlaneCard />
        </div>
      </section>
    </main>
  );
};

export default Home;
