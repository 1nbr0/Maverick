import { Dropdown, Navbar } from "flowbite-react";
import React from "react";
import MaverickLogo from "../../assets/images/maverick-icon.jpg";
import { Link } from "react-router-dom";

const HeaderNavbar = () => {
  return (
    <Navbar fluid={true} rounded={true} className="header-navbar">
      <Navbar.Brand href="#">
        <img
          src={MaverickLogo}
          className="mr-3 h-6 sm:h-9"
          alt="Maverick Logo"
        />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          Maverick
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown arrowIcon={true} inline={true} label="Robin Turpin">
          <Dropdown.Header>
            <span className="block truncate text-sm font-medium">
              firstname.name@gmail.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Compte</Dropdown.Item>
          <Dropdown.Divider />
          <Link to="/connexion">
            <Dropdown.Item className="text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              Se déconnecter
            </Dropdown.Item>
          </Link>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse></Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderNavbar;
