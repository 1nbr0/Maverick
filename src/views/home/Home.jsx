import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import React from "react";

const Home = () => {
  return (
    <div className="container mx-auto px-4">
      <section className="section-home-view">
        <div>
          <h1>Home View | Bonjour User 🫡</h1>
        </div>
      </section>
      <section className="section-my-plane">
        <div className="header-warplanes">
          <div>
            <h2>Mes avions</h2>
          </div>
          <Button variant="outlined" size="lg" color="light-blue" className="flex items-center gap-3 radius-inherit hover:bg-gradient-to-bl hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:opacity-100">
            <PlusIcon strokeWidth={2} className="h-6 w-6" /> Nouvel avion
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
