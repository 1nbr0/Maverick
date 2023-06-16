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

function FlightScheduleMenuCard({ isHover, flightScheduleId }) {
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
    navigate(`/plan-de-vol/edition/${flightScheduleId}`);
  };

  const handleCancelDelete = (event) => {
    event.stopPropagation();
    setOpen(!open);
  };

  const deleteFlightSchedule = async (flightScheduleId) => {
    try {
      if (!flightScheduleId) {
        throw new Error("No flight schedule id");
      }
      await apiInstance.delete(`/flight_schedules/${flightScheduleId}`);
      refreshPage();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFlightSchedule = (event) => {
    event.stopPropagation();
    deleteFlightSchedule(flightScheduleId);
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
          <IconButton variant="outlined" color="light-blue">
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
        <DialogHeader>Supprimer un plan de vol</DialogHeader>
        <DialogBody divider>
          Cela supprimera définitivement le plan de vol. Êtes-vous sûr de
          vouloir supprimer ce vol ?
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
          <Button
            variant="gradient"
            color="red"
            onClick={handleDeleteFlightSchedule}
          >
            <span>Supprimer ce plan de vol</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default FlightScheduleMenuCard;
