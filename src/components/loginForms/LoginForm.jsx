import { InformationCircleIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

export default function LoginForms({ childToParent }) {
  const data = true;
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    setError("");

    try {
      const response = await axios.post(
        "https://localhost/api/login_check",
        values
      );

      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: values.email },
      });

      navigate("/");
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
      email: "",
      password: "",
    },
    validate,
    onSubmit,
  });

  return (
    <Card className="w-96">
      <CardHeader
        floated={false}
        shadow={false}
        className="grid h-28 place-items-center"
      >
        <Typography variant="h3" className="font-normal" color="black">
          Se connecter
        </Typography>
      </CardHeader>
      <form
        className="mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={formik.handleSubmit}
      >
        <CardBody className="flex flex-col gap-4">
          {error ? (
            <Typography
              variant="small"
              color="red"
              className="flex items-center gap-1 font-normal"
            >
              {error}
            </Typography>
          ) : null}
          <Input
            label="Email"
            size="lg"
            id="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email ? true : false}
            success={formik.values.email && !formik.errors.email ? true : false}
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
        </CardBody>
        <CardFooter className="pt-0">
          <Button type="submit" variant="gradient" fullWidth>
            Connexion
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Vous n'avez pas de compte ?
            <Typography
              as="a"
              onClick={() => childToParent(data)}
              variant="small"
              color="light-blue"
              className="ml-1 font-bold cursor-pointer"
            >
              S'inscrire
            </Typography>
          </Typography>
        </CardFooter>
      </form>
    </Card>
  );
}
