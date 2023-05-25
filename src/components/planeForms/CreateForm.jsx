import { ArrowUpTrayIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Input, Typography, Button } from "@material-tailwind/react";
import React, { useState } from "react";

function CreateForm() {
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
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
      <div className="mt-8 mb-4 flex flex-row justify-center w-full gap-6">
        <div className="flex flex-col w-full">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <ArrowUpTrayIcon strokeWidth={2} className="h-6 w-6" />
              <Typography
                variant="paragraph"
                class="mb-2 text-sm text-gray-500 dark:text-gray-400"
              >
                <span class="font-semibold">Cliquez pour télécharger</span> ou
                glisser et déposer
              </Typography>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              onChange={handleFileChange}
            />
          </label>
          <div>{file && `${file.name} - ${file.type}`}</div>
        </div>
        <div className="flex flex-col w-full gap-6 mt-4">
          <Input size="lg" label="Nom de votre avion" />
          <Input size="lg" label="Armements" />
        </div>
      </div>
      <figure className="relative h-full w-full">
        <img className="h-full w-full rounded-xl" src={file} alt="nature" />
      </figure>
    </form>
  );
}

export default CreateForm;
