import React, { useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Typography,
  Button,
  DialogFooter,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { apiInstance } from "../../services/auth.service";

function MenuCard({ isHover, warplaneId }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = (event) => {
    event.stopPropagation();
    setOpen(!open);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleClickEdit = (event) => {
    event.stopPropagation();
    navigate(`/avion/edition/${warplaneId}`);
  };

  const handleCancelDelete = (event) => {
    event.stopPropagation();
    setOpen(!open);
  };

  const deleteWarplane = async (warplaneId) => {
    try {
      if (!warplaneId) {
        throw new Error("No user id");
      }
      await apiInstance.delete(`/warplanes/${warplaneId}`);
      refreshPage();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteWarplane = (event) => {
    event.stopPropagation();
    deleteWarplane(warplaneId);
  };

  return (
    <>
      <Menu placement="bottom-end">
        <MenuHandler
          className={
            isHover
              ? "!absolute !top-4 !right-4 opacity-1"
              : "!absolute !top-4 !right-4 opacity-0"
          }
        >
          <IconButton variant="gradient" color="white">
            <EllipsisHorizontalIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </MenuHandler>
        <MenuList className="flex flex-col gap-1">
          <MenuItem
            className="flex items-center py-1 pr-4 pl-1"
            onClick={handleClickEdit}
          >
            <div className="flex flex-col gap-1">
              <Typography variant="small" color="gray" className="font-normal">
                <span className="font-medium text-blue-gray-900">Éditer</span>
              </Typography>
            </div>
          </MenuItem>
          <MenuItem
            className="flex items-center py-1 pr-4 pl-1"
            onClick={handleOpen}
          >
            <div className="flex flex-col gap-1">
              <Typography variant="small" color="gray" className="font-normal">
                <span className="font-medium text-red-900">Supprimer</span>
              </Typography>
            </div>
          </MenuItem>
        </MenuList>
      </Menu>
      <Dialog open={open} size="xs" handler={handleOpen}>
        <DialogHeader>Supprimer un avion</DialogHeader>
        <DialogBody divider>
          Cela supprimera définitivement l'avion. Êtes-vous sûr de vouloir
          supprimer cet avion ?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="light-blue"
            onClick={handleCancelDelete}
            className="mr-1"
          >
            <span>Annuler</span>
          </Button>
          <Button variant="gradient" color="red" onClick={handleDeleteWarplane}>
            <span>Supprimer cet avion</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default MenuCard;
