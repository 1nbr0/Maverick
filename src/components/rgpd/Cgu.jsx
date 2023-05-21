import { Typography } from "@material-tailwind/react";
import React from "react";

const Cgu = () => {
  return (
    <>
      <grid>
        <Typography variant="lead">Cher utilisateur,</Typography>
        <br />
        <Typography variant="paragraph">
          Nous vous informons que nous collectons certaines données vous
          concernant dans le cadre de l'utilisation de notre application. Votre
          vie privée est importante pour nous, et nous nous engageons à traiter
          vos données de manière transparente et conforme aux exigences du RGPD.
        </Typography>
        <br />
        <Typography variant="h6">Les données que nous collectons :</Typography>
        <br />
        <ul>
          <li>Adresse e-mail</li>
          <li>Mot de passe</li>
        </ul>
        <br />
        <Typography variant="paragraph">
          Ces données sont collectées lorsque vous vous inscrivez à notre
          application et les fournissez volontairement. Elles sont nécessaires
          pour le fonctionnement de l'application et nous permettent de vous
          offrir une expérience utilisateur optimale.
        </Typography>
        <br />
        <Typography variant="h6">Les finalités du traitement :</Typography>
        <br />
        <Typography variant="paragraph">
          Nous utilisons les données collectées pour les finalités suivantes :
        </Typography>
        <br />
        <ul>
          <li>Gérer votre compte utilisateur sur notre application</li>
          <li>Vous fournir les services demandés via notre application</li>
          <li>
            Vous envoyer des communications relatives à votre compte et à nos
            services
          </li>
          <li>Améliorer et optimiser notre application</li>
        </ul>
        <br />
        <Typography variant="h6">Base légale du traitement :</Typography>
        <br />
        <Typography variant="paragraph">
          La base légale du traitement de vos données personnelles est votre
          consentement, que vous avez donné en acceptant les conditions
          d'utilisation lors de votre inscription à notre application.
        </Typography>
        <br />
        <Typography variant="h6">Durée de conservation :</Typography>
        <br />
        <Typography variant="paragraph">
          Vos données personnelles seront conservées aussi longtemps que
          nécessaire pour atteindre les finalités pour lesquelles elles ont été
          collectées, ou conformément aux exigences légales applicables.
        </Typography>
        <br />
        <Typography variant="h6">Sécurité des données :</Typography>
        <br />
        <Typography variant="paragraph">
          Nous mettons en place des mesures de sécurité appropriées pour
          protéger vos données personnelles contre tout accès, utilisation,
          divulgation, altération ou destruction non autorisés.
        </Typography>
        <br />
        <Typography variant="h6">Vos droits :</Typography>
        <br />
        <Typography variant="paragraph">
          En vertu du RGPD, vous avez certains droits relatifs à vos données
          personnelles, notamment le droit d'accéder, de rectifier, d'effacer,
          de limiter ou de vous opposer au traitement de vos données. Vous avez
          également le droit de retirer votre consentement à tout moment. Pour
          exercer ces droits, veuillez nous contacter à admin@maverick.com .
          <br />
          <br />
          Nous tenons à vous remercier de votre confiance et de votre
          utilisation de notre application. Si vous avez des questions ou des
          préoccupations concernant la collecte et le traitement de vos données
          personnelles, n'hésitez pas à nous contacter.
          <br />
          <br />
          Cordialement,
          <br />
          <br />
          <Typography variant="h5" color="light-blue" textGradient>
            Maverick Enterprise
          </Typography>
        </Typography>
      </grid>
    </>
  );
};

export default Cgu;
