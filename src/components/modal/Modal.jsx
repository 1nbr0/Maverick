import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
  Input,
} from "@material-tailwind/react";
import {
  InformationCircleIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import { deleteUser } from "../../services/apiRequest";
import { getCurrentUserId } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Modal({ openModal, handleOpen, userData }) {
  const navigate = useNavigate();
  const validate = (values) => {
    const errors = {};
    console.log(values.username);
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
    },
    validate,
  });

  const deleteAccount = () => {
    const userId = getCurrentUserId();
    const isAccountDelete = deleteUser(userId);
    if (isAccountDelete) {
      navigate("/connexion");
    }
  };

  return (
    <>
      <Dialog
        open={openModal}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="p-5"
      >
        <DialogHeader className="justify-between">
          <Typography variant="h5" color="blue-gray">
            Mon Compte
          </Typography>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
          >
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="px-5 pt-10">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Nom d'utilisateur"
              id="username"
              type="text"
              onChange={formik.handleChange}
              value={
                formik.values.username === ""
                  ? userData.username
                  : formik.values.username
              }
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
              value={
                formik.values.email === ""
                  ? userData.email
                  : formik.values.email
              }
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
          <div className="mt-10">
            <Typography variant="h5" color="blue-gray" className="pb-6">
              Options Avancées
            </Typography>
            <Button
              variant="outlined"
              color="red"
              onClick={deleteAccount}
              fullWidth
              className="flex items-center justify-center gap-3"
            >
              <TrashIcon strokeWidth={2} className="h-5 w-5" /> Supprimer mon
              compte
            </Button>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="light-blue" onClick={handleOpen}>
            Mettre à jour
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
