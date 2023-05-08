import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function LoginForms({childToParent}) {
  const data = true
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
      <CardBody className="flex flex-col gap-4">
        <Input label="Email" size="lg" />
        <Input label="Mot de passe" size="lg" />
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth>
          <Link to="/">Connexion</Link>
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          Vous n'avez pas de compte ?
          <Typography
            as="a"
            href="#signup"
            onClick={() => childToParent(data)}
            variant="small"
            color="light-blue"
            className="ml-1 font-bold"
          >
            S'inscrire
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
  );
}
