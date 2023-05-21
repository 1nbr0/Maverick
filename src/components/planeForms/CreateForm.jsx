import { PlusIcon } from "@heroicons/react/24/outline";
import { Input, Typography, Button } from "@material-tailwind/react";
import React from "react";

function CreateForm() {
  return (
    <form className="mt-8 mb-2">
      <div className="block-create-plane">
        <div className="header-warplanes">
          <Typography variant="h1" className="text-3xl font-normal">
            Nouvel avion
          </Typography>
          <Button
            variant="outlined"
            size="lg"
            color="light-blue"
            className="flex items-center gap-3 radius-inherit hover:bg-gradient-to-bl hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:opacity-100"
          >
            <PlusIcon strokeWidth={2} className="h-6 w-6" /> Ajouter
          </Button>
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-6">
        <Input size="lg" label="Name" />
      </div>
    </form>
  );
}

export default CreateForm;
