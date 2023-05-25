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
import { getCurrentUserId } from "../../services/auth.service";
import { deleteWarplaneById } from "../../services/apiRequest";

function MenuCard({ isHover }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleClickEdit = () => {
    navigate("/avion/edition/1");
  };

  const handleDeleteWarplane = () => {
    const userId = getCurrentUserId();
    deleteWarplaneById(userId);
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
          <MenuItem className="flex items-center py-1 pr-4 pl-1">
            <div className="flex flex-col gap-1">
              <Typography variant="small" color="gray" className="font-normal">
                <span className="font-medium text-red-900">Supprimer</span>
              </Typography>
            </div>
          </MenuItem>
        </MenuList>
      </Menu>
      <Dialog open={open} size="xs" handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody divider>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus ad
          reprehenderit omnis perspiciatis aut odit! Unde architecto
          perspiciatis, dolorum dolorem iure quia saepe autem accusamus eum
          praesentium magni corrupti explicabo!
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="light-blue"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Annuler</span>
          </Button>
          <Button variant="gradient" color="red" onClick={handleDeleteWarplane}>
            <span>Supprimer</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default MenuCard;
