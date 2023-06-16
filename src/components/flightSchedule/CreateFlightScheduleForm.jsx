import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  Input,
  Typography,
  Button,
  Select,
  Option,
  Spinner,
} from "@material-tailwind/react";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiInstance, CurrentUserId } from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";

const useGenerateRandomString = () => {
  let result = "";

  // Générer 4 chiffres aléatoires
  for (let i = 0; i < 4; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    result += randomDigit;
  }

  // Générer une lettre majuscule aléatoire
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomIndex = Math.floor(Math.random() * characters.length);
  const randomLetter = characters.charAt(randomIndex);

  // Ajouter la lettre majuscule à la fin de la chaîne
  result += randomLetter;

  return result;
};

const useUserWarplanes = () => {
  const [warplanes, setWarplanes] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWarplanes = async () => {
      try {
        const userId = CurrentUserId();
        if (!userId) {
          throw new Error("No user id");
        }
        const response = await apiInstance.get(`/users/${userId}/warplanes`);
        if (!ignore) {
          setWarplanes(response.data || []);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };
    let ignore = false;

    fetchWarplanes();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    warplanes,
    error,
  };
};

const WarplanesSelect = ({ register, setValue }) => {
  const { warplanes, error } = useUserWarplanes();

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setValue("assignedPlane", selectedValue);
  };

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
          <h1 className="text-2xl font-normal">
            Nous avons perdu la communication avec la tour de contrôle. Il n'y a
            aucun avion à disposition. Ajoute en un !
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          <Select label="Avion" {...register("assignedPlane")}>
            {warplanes.map((warplane) => (
              <Option
                key={warplane.id}
                value={String(warplane.id)}
                onChange={handleSelectChange}
              >
                {warplane.name}
              </Option>
            ))}
          </Select>
        </div>
      )}
    </>
  );
};

const useAirports = () => {
  const [airports, setAirports] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await apiInstance.get(`/airports/`);
        if (!ignore) {
          setAirports(response.data || []);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    let ignore = false;

    fetchAirports();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    airports,
    error,
  };
};

const DepartureAirportSelect = ({ onDepartureAirportSelect }) => {
  const { airports, error } = useAirports();

  if (error) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">{error.message}</h1>
      </div>
    );
  }

  if (airports === null) {
    return (
      <div className="text-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <>
      {airports.length === 0 ? (
        <div className="text-center">
          <h1 className="text-2xl font-normal">
            Nous avons perdu la communication avec la tour de contrôle. Il n'y a
            aucun avion à disposition. Ajoute en un !
          </h1>
        </div>
      ) : (
        <div className="col-span-6 flex flex-col">
          <Select
            label="Aéroport de décollage"
            onChange={(id) => {
              onDepartureAirportSelect(id);
            }}
          >
            {airports.map((airport) => (
              <Option key={airport.id} value={airport.id}>
                {airport.name}
              </Option>
            ))}
          </Select>
        </div>
      )}
    </>
  );
};

const ArrivalAirportSelect = ({ onArrivalAirportSelect }) => {
  const { airports, error } = useAirports();

  if (error) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">{error.message}</h1>
      </div>
    );
  }

  if (airports === null) {
    return (
      <div className="text-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <>
      {airports.length === 0 ? (
        <div className="text-center">
          <h1 className="text-2xl font-normal">
            Nous avons perdu la communication avec la tour de contrôle. Il n'y a
            aucun avion à disposition. Ajoute en un !
          </h1>
        </div>
      ) : (
        <div className="col-span-6 flex flex-col">
          <Select
            label="Aéroport d'attérissage"
            onChange={(id) => {
              onArrivalAirportSelect(id);
            }}
          >
            {airports.map((airport) => (
              <Option key={airport.id} value={airport.id}>
                {airport.name}
              </Option>
            ))}
          </Select>
        </div>
      )}
    </>
  );
};

const useAirportTracks = (airportId) => {
  const [tracks, setTracks] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAirportTracks = async () => {
      setTracks(null);
      if (airportId) {
        try {
          const response = await apiInstance.get(`/airports/${airportId}`);
          if (!ignore) {
            setTracks(response.data.numTrack || []);
          }
        } catch (error) {
          console.error(error);
          setError(error);
        }
      }
    };

    let ignore = false;

    fetchAirportTracks();

    return () => {
      ignore = true;
    };
  }, [airportId]);

  return {
    tracks,
    error,
  };
};

const DepartureTrackSelect = ({ selectedDepartureAirportId }) => {
  const { tracks, error } = useAirportTracks(selectedDepartureAirportId);
  const { register } = useForm();

  if (error) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">{error.message}</h1>
      </div>
    );
  }

  if (tracks === null) {
    return;
  }

  return (
    <>
      {tracks.length === 0 ? (
        <div className="text-center">
          <h1 className="text-2xl font-normal">
            Nous avons perdu la communication avec la tour de contrôle. Il n'y a
            aucun avion à disposition. Ajoute en un !
          </h1>
        </div>
      ) : (
        <div className="col-span-6 flex flex-col">
          <Select label="Piste de décollage" {...register("departureTrack")}>
            {tracks.map((track) => (
              <Option key={track.id} value={track.id}>
                Piste : {track.idTrackNumber} - {track.trackNameQfu}
              </Option>
            ))}
          </Select>
        </div>
      )}
    </>
  );
};

const ArrivalTrackSelect = ({ selectedArrivalAirportId }) => {
  const { tracks, error } = useAirportTracks(selectedArrivalAirportId);

  if (error) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">{error.message}</h1>
      </div>
    );
  }

  if (tracks === null) {
    return;
  }

  return (
    <>
      {tracks.length === 0 ? (
        <div className="text-center">
          <h1 className="text-2xl font-normal">
            Nous avons perdu la communication avec la tour de contrôle. Il n'y a
            aucun avion à disposition. Ajoute en un !
          </h1>
        </div>
      ) : (
        <div className="col-span-6 flex flex-col">
          <Select label="Piste d'attérissage">
            {tracks.map((track) => (
              <Option key={track.id} value={track.id}>
                Piste : {track.idTrackNumber} - {track.trackNameQfu}
              </Option>
            ))}
          </Select>
        </div>
      )}
    </>
  );
};

function CreateFlightScheduleForm() {
  const [errorForm, setErrorForm] = useState();
  const navigate = useNavigate();
  const randomString = useGenerateRandomString();
  const [selectedDepartureAirportId, setSelectedDepartureAirportId] =
    useState(null);
  const [selectedArrivalAirportId, setSelectedArrivalAirportId] =
    useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleDepartureAirportSelect = (airportId) => {
    setSelectedDepartureAirportId(airportId);
  };

  const handleArrivalAirportSelect = (airportId) => {
    setSelectedArrivalAirportId(airportId);
  };

  const onSubmitForm = async (data) => {
    try {
      const userId = CurrentUserId();
      if (!userId) {
        throw new Error("No user id");
      }
      console.log(data);
      const response = await apiInstance.post("/flight_schedules", {
        name: data.name,
        idFlight: randomString,
        departureTime: new Date(data.departureDateTime).toISOString(),
        arrivalTime: new Date(data.arrivalDateTime).toISOString(),
        departureTrack: "/api/warplanes/" + data.departureTrack,
        arrivalTrack: "/api/warplanes/" + data.arrivalTrack,
        ownerOfFlightSchedules: "/api/users/" + userId,
        assignedPlane: "/api/users/" + data.assignedPlane,
      });
      console.log(response);
      // if (response) {
      //   navigate("/");
      // }
    } catch (err) {
      if (err && err instanceof AxiosError) {
        setErrorForm(err.response?.data.message);
      } else if (err && err instanceof Error) {
        setErrorForm(err.message);
      }
      console.log("Error", err);
    }
  };

  const DepartureDateTimePicker = () => {
    return (
      <div className="col-md-6 flex flex-col">
        <label htmlFor="departureDateTime" className="text-md font-medium">
          Date et heure du décollage
        </label>
        <input
          type="datetime-local"
          id="departureDateTime"
          {...register("departureDateTime", { required: true })}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.dateTime && (
          <span className="text-red-500">Ce champ est requis</span>
        )}
      </div>
    );
  };

  const ArrivalDateTimePicker = () => {
    return (
      <div className="col-md-6 flex flex-col">
        <label htmlFor="arrivalDateTime" className="text-md font-medium">
          Date et heure de l'attérissage
        </label>
        <input
          type="datetime-local"
          id="arrivalDateTime"
          {...register("arrivalDateTime", { required: true })}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.dateTime && (
          <span className="text-red-500">Ce champ est requis</span>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="mt-8 mb-2">
      <div className="block-create-plane">
        <div className="flex flex-row justify-start">
          <Link to="/">
            <Typography className="text-l font-normal flex flex-row items-center mb-4">
              <ChevronLeftIcon strokeWidth={2} className="h-4 w-4" /> Retour
            </Typography>
          </Link>
        </div>
        <div className="header-warplanes">
          <Typography variant="h1" className="text-3xl font-normal">
            Nouveau plan de vol
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
        <div className="flex flex-col w-full gap-6 mt-4">
          <Input
            {...register("idFlight")}
            type="text"
            size="lg"
            value={randomString}
            disabled={true}
            label="Identifiant du plan de vol"
          />
          <Input
            {...register("name", { required: true })}
            type="text"
            size="lg"
            label="Nom du plan de vol"
          />
          {errors.name && <span>Ce champ est obligatoire</span>}
          <WarplanesSelect register={register} setValue={setValue} />
          <div className="flex flex-wrap flex-row gap-16">
            <DepartureAirportSelect
              onDepartureAirportSelect={handleDepartureAirportSelect}
            />
            <ArrivalAirportSelect
              onArrivalAirportSelect={handleArrivalAirportSelect}
            />
          </div>
          <div className="flex flex-wrap flex-row gap-16">
            <DepartureTrackSelect
              selectedDepartureAirportId={selectedDepartureAirportId}
            />
            <ArrivalTrackSelect
              selectedArrivalAirportId={selectedArrivalAirportId}
            />
          </div>
          <div className="flex flex-wrap flex-row gap-16">
            <DepartureDateTimePicker />
            <ArrivalDateTimePicker />
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreateFlightScheduleForm;
