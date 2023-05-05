import { Button, Card, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const LoginForms = () => {
  return (
    <div className="max-w-sm w-full">
      <Card>
        <div className="flex items-center justify-center">
          <h1>Se connecter</h1>
        </div>
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="name@flowbite.com"
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Mot de passe" />
            </div>
            <TextInput
              id="password"
              placeholder="********"
              type="password"
              required={true}
            />
          </div>
          <Button type="submit">
            <Link to="/">Connexion</Link>
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginForms;
