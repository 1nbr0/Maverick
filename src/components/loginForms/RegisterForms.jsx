import { Card, Input, Checkbox, Button, Typography, CardBody, CardHeader, CardFooter } from "@material-tailwind/react";

export default function RegisterForms({childToParent}) {
  const onRegistering = () => {}
  const data = false
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
      <form className="mb-2 w-80 max-w-screen-lg sm:w-96">
        <CardBody className="flex flex-col gap-4">
          <Typography color="gray" className="mt-1 font-normal">
            Saisissez vos coordonnées pour vous inscrire.
          </Typography>
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" label="Nom d'utilisateur" />
              <Input size="lg" label="Email" />
              <Input type="password" size="lg" label="Mot de passe" />
            </div>
            <Checkbox
              label={
                (
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    J'accepte les
                    <a
                      href="#"
                      className="font-medium transition-colors hover:text-blue-500"
                    >
                      &nbsp;Conditions générales
                    </a>
                  </Typography>
                )
              }
              containerProps={{ className: "-ml-2.5" }}
            />
        </CardBody>
        <CardFooter className="pt-0">
          <Button fullWidth color="light-blue" onClick={onRegistering}>
            Inscription
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
              Déjà un compte ?
              <Typography
                as="a"
                href="#signup"
                onClick={() => childToParent(data)}
                variant="small"
                color="light-blue"
                className="ml-1 font-bold"
              >
                Se connecter
              </Typography>
            </Typography>
        </CardFooter>
      </form>
    </Card>
  );
}