import { InformationCircleIcon } from "@heroicons/react/24/outline";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  CardBody,
  CardHeader,
  CardFooter,
} from "@material-tailwind/react";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterForms({ childToParent }) {
  const data = false;
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    setError("");

    try {
      await axios.post("https://localhost/api/register", values);
      navigate("/connexion");
    } catch (err) {
      if (err && err instanceof AxiosError) {
        setError(err.response?.data.message);
      } else if (err && err instanceof Error) {
        setError(err.message);
      }

      console.log("Error", err);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Le nom d'utilisateur est requis";
    } else if (values.username.length > 20) {
      errors.username = "Doit comporter 20 caractères ou moins";
    }

    if (!values.email) {
      errors.email = "L'email est requis";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Email invalide";
    }

    if (!values.password) {
      errors.password = "Le mot de passe est requis";
    } else if (values.password.length < 10) {
      errors.password = "Doit comporter 10 caractères ou plus";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      roles: [],
    },
    validate,
    onSubmit,
  });

  return (
    <Card color="white" shadow={false}>
      <CardHeader
        floated={false}
        shadow={false}
        className="grid h-20 place-items-center"
      >
        <Typography variant="h3" className="font-normal" color="black">
          S'inscrire
        </Typography>
      </CardHeader>
      <form
        className="mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={formik.handleSubmit}
      >
        <CardBody className="flex flex-col gap-4">
          <Typography color="gray" className="mt-1 font-normal">
            Saisissez vos coordonnées pour vous inscrire.
          </Typography>
          {error ? (
            <Typography
              variant="small"
              color="red"
              className="flex items-center gap-1 font-normal"
            >
              {error}
            </Typography>
          ) : null}
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Nom d'utilisateur"
              id="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              error={formik.errors.username ? true : false}
              success={
                formik.values.username && !formik.errors.username ? true : false
              }
            />
            {formik.errors.username ? (
              <Typography
                variant="small"
                color="red"
                className="flex items-center gap-1 font-normal"
              >
                <InformationCircleIcon className="w-4 h-4 -mt-px" />
                {formik.errors.username}
              </Typography>
            ) : null}
            <Input
              size="lg"
              label="Email"
              id="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.errors.email ? true : false}
              success={
                formik.values.email && !formik.errors.email ? true : false
              }
            />
            {formik.errors.email ? (
              <Typography
                variant="small"
                color="red"
                className="flex items-center gap-1 font-normal"
              >
                <InformationCircleIcon className="w-4 h-4 -mt-px" />
                {formik.errors.email}
              </Typography>
            ) : null}
            <Input
              label="Mot de passe"
              size="lg"
              id="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.errors.password ? true : false}
              success={
                formik.values.password && !formik.errors.password ? true : false
              }
            />
            {formik.errors.password ? (
              <Typography
                variant="small"
                color="red"
                className="flex items-center gap-1 font-normal"
              >
                <InformationCircleIcon className="w-4 h-4 -mt-px" />
                {formik.errors.password}
              </Typography>
            ) : null}
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                J'accepte les
                <Link
                  to={"#"}
                  className="font-medium transition-colors hover:text-blue-500"
                >
                  &nbsp;Conditions générales
                </Link>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button type="submit" fullWidth color="light-blue">
            Inscription
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Déjà un compte ?
            <Typography
              as="a"
              onClick={() => childToParent(data)}
              variant="small"
              color="light-blue"
              className="ml-1 font-bold cursor-pointer"
            >
              Se connecter
            </Typography>
          </Typography>
        </CardFooter>
      </form>
    </Card>
  );
}
