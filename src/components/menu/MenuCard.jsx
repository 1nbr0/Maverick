import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

function MenuCard({ isHover }) {
  return (
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
        <MenuItem className="flex items-center py-1 pr-4 pl-1">
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
  );
}

export default MenuCard;
