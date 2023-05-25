import React, { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import MaverickLogo from "../../assets/images/maverick-icon.jpg";
import { useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import Modal from "../modal/Modal";
import { getCurrentUser } from "../../services/auth.service";

// profile menu component
const profileMenuItems = [
  {
    label: "Mon Compte",
    icon: UserCircleIcon,
  },
  {
    label: "Se Déconnecter",
    icon: PowerIcon,
  },
];

function ProfileMenu({ userData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const signOut = useSignOut();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const logout = () => {
    signOut();
    navigate("/connexion");
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-normal capitalize">
            {userData?.username ? userData?.username : ""}
          </Typography>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={isLastItem ? logout : handleOpen}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
      <Modal openModal={open} handleOpen={handleOpen} userData={userData} />
    </Menu>
  );
}

export default function ComplexNavbar({ handleOpen }) {
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getCurrentUser();
        if (userData !== false) {
          setCurrentUser(userData); // Les données de l'utilisateur sont affichées ici
        } else {
          console.log("L'identifiant de l'utilisateur n'est pas disponible.");
        }
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des données de l'utilisateur :",
          error
        );
      }
    }
    fetchData();
  }, []);

  return (
    <Navbar
      className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-40 lg:py-10"
      shadow={false}
    >
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <img
          src={MaverickLogo}
          className="mr-3 h-6 sm:h-9"
          alt="Maverick Logo"
        />
        <Typography
          as="a"
          href="/"
          className="self-center mr-4 ml-2 text-2xl whitespace-nowrap cursor-pointer py-1.5 font-semibold"
        >
          Maverick
        </Typography>
        <ProfileMenu userData={currentUser} />
      </div>
    </Navbar>
  );
}
