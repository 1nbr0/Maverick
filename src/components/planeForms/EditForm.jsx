import { ChevronLeftIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Input, Typography, Button } from "@material-tailwind/react";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiInstance, CurrentUserId } from "../../services/auth.service";
import { Link, useNavigate, useParams } from "react-router-dom";

const useFetchWarplane = () => {
  const [warplane, setWarplane] = useState(null);
  const params = useParams();

  useEffect(() => {
    const getWarplane = async () => {
      try {
        const response = await apiInstance.get(`/warplanes/${params.id}`);
        setWarplane(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getWarplane();
  }, [params.id]);

  return { warplane };
};

function EditForm() {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { warplane } = useFetchWarplane();

  const onSubmitForm = async (data) => {
    try {
      const userId = CurrentUserId();
      if (!userId) {
        throw new Error("No user id");
      }
      const response = await apiInstance.patch(
        `/warplanes/${params.id}`,
        {
          name:
            data.warplaneName === warplane?.name || data.warplaneName === ""
              ? warplane?.name
              : data.warplaneName,
          armament:
            data.armaments === warplane?.armaments || data.armaments === ""
              ? warplane?.armaments
              : data.armaments,
          owner: "/api/users/" + userId,
        },
        {
          headers: {
            "Content-Type": `application/merge-patch+json;`,
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
      console.log("Error", err, error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="mt-8 mb-2">
      <div className="block-create-plane">
        <Typography>
          <Link
            to="/"
            className="text-l font-normal flex flex-row items-center mb-4"
          >
            <ChevronLeftIcon strokeWidth={2} className="h-4 w-4" /> Retour
          </Link>
        </Typography>
        <div className="header-warplanes">
          <Typography variant="h1" className="text-3xl font-normal">
            Modifier votre avion
          </Typography>
          <Button
            type="submit"
            variant="outlined"
            size="lg"
            color="light-blue"
            className="flex items-center gap-3 radius-inherit hover:bg-gradient-to-bl hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:opacity-100"
          >
            <PencilIcon strokeWidth={2} className="h-6 w-6" /> Modifier
          </Button>
        </div>
      </div>
      <div className="mt-8 mb-4 flex flex-row justify-center w-full gap-6">
        <div className="flex flex-col w-full gap-6 mt-4">
          <Input
            {...register("warplaneName", { required: true })}
            type="text"
            size="lg"
            label="Nom de votre avion"
          />
          {errors.warplaneName && <span>Ce champ est obligatoire</span>}
          <Input
            {...register("armaments")}
            type="text"
            size="lg"
            label="Armements"
          />
          {errors.armaments}
        </div>
      </div>
    </form>
  );
}

export default EditForm;
