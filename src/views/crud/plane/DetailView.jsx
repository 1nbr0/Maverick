import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiInstance } from "../../../services/auth.service";
import { Typography } from "@material-tailwind/react";
import { Spinner } from "flowbite-react";
import { baseUrl } from "../../../services/auth.service";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const useUserWarplaneDetail = () => {
  const [warplane, setWarplane] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    const getWarplane = async () => {
      try {
        const response = await apiInstance.get(`/warplanes/${params.id}`);
        setWarplane(response.data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };
    getWarplane();
  }, [params.id]);

  return { warplane, error };
};

const PlaneCaption = () => {
  const { warplane, error } = useUserWarplaneDetail();

  if (error) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">{error.message}</h1>
      </div>
    );
  }

  if (warplane === null) {
    return (
      <div className="text-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <figure className="relative h-3/4 w-8/12">
      <img
        className="h-full w-full rounded-xl"
        src={baseUrl + warplane.contentUrl}
        alt="illustration de l'avion"
      />
      <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
        <div>
          <Typography variant="h5" color="blue-gray">
            {warplane.name}
          </Typography>
          <Typography color="gray" className="mt-2 font-normal">
            {warplane.armament}
          </Typography>
        </div>
      </figcaption>
    </figure>
  );
};

const WarplaneDetail = () => {
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
        <div className="flex justify-center">
          <PlaneCaption />
        </div>
      </div>
    </>
  );
};

const DetailView = () => {
  return (
    <>
      <WarplaneDetail />
    </>
  );
};

export default DetailView;
