import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiInstance } from "../../../services/auth.service";
import { Typography } from "@material-tailwind/react";
import { Spinner } from "flowbite-react";

const useUserWarplaneDetail = () => {
  const [warplane, setWarplane] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    const getWarplane = async () => {
      try {
        const response = await apiInstance.get(`/warplanes/${params.id}`);
        setWarplane(response);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };
    getWarplane();
  }, [params.id]);

  return { warplane, error };
};

const WarplaneDetail = () => {
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
  console.log(warplane);

  return (
    <>
      {warplane.length === 0 ? (
        <div className="text-center">
          <h1 className="text-2xl font-normal">
            Nous avons perdu la communication avec la tour de contrôle. Il n'y a
            aucun avion à disposition. Ajoute en un !
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          <Typography>{warplane.name}</Typography>
        </div>
      )}
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
