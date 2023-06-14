import {
  ArrowUpTrayIcon,
  ChevronLeftIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Input, Typography, Button } from "@material-tailwind/react";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { apiInstance, CurrentUserId } from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";

function CreateForm() {
  const [file, setFile] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmitForm = async (data) => {
    try {
      const userId = CurrentUserId();
      if (!userId) {
        throw new Error("No user id");
      }
      const response = await apiInstance.post(
        "/warplanes",
        {
          owner: "/api/users/" + userId,
          name: data.warplaneName,
          armament: data.armaments,
          flightSchedules: [],
          file: data.warplanePicture[0],
        },
        {
          headers: {
            "Content-Type": `multipart/form-data;`,
          },
        }
      );
      if (response) {
        navigate("/");
      }
    } catch (err) {
      if (err && err instanceof AxiosError) {
        setError(err.response?.data.message);
      } else if (err && err instanceof Error) {
        setError(err.message);
      }
      console.log("Error", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="mt-8 mb-2">
      <div className="block-create-plane">
        <Typography className="text-l font-normal flex flex-row items-center mb-4">
          <Link to="/">
            <ChevronLeftIcon strokeWidth={2} className="h-4 w-4" /> Retour
          </Link>
        </Typography>
        <div className="header-warplanes">
          <Typography variant="h1" className="text-3xl font-normal">
            Nouvel avion
          </Typography>
          <Button
            type="submit"
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
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ArrowUpTrayIcon strokeWidth={2} className="h-6 w-6" />
              <Typography
                variant="paragraph"
                className="mb-2 text-sm text-gray-500 dark:text-gray-400"
              >
                <span className="font-semibold">Cliquez pour télécharger</span>{" "}
                ou glisser et déposer
              </Typography>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG (MAX. 800x400px)
              </p>
            </div>
            <input
              {...register("warplanePicture")}
              id="dropzone-file"
              type="file"
              className="opacity-0"
            />
          </label>
          <div>{file && `${file.name} - ${file.type}`}</div>
          <div>
            {errors.warplaneImage && <span>Ce champ est obligatoire</span>}
          </div>
        </div>
        <div className="flex flex-col w-full gap-6 mt-4">
          <Input
            {...register("warplaneName", { required: true })}
            type="text"
            size="lg"
            label="Nom de votre avion"
          />
          {errors.warplaneName && <span>Ce champ est obligatoire</span>}
          <Input
            {...register("armaments", { required: true })}
            type="text"
            size="lg"
            label="Armements"
          />
          {errors.armaments && <span>Ce champ est obligatoire</span>}
        </div>
      </div>
    </form>
  );
}

export default CreateForm;
