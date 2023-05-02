import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'

const LoginForms = () => {
  return (
    <div className='flex flex-col flex-nowrap justify-center items-center login-box'>
      <div className='flex items-center'>
        <h1>Maverick App</h1>
      </div>
      <div className='h-full'>
        <h2 className='mb-3'>Connexion</h2>
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="email"
                value="Adresse mail"
              />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="name@gmail.com"
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password"
                value="Mot de passe"
              />
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="*********"
              required={true}
            />
          </div>
          <Button type="submit">
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginForms