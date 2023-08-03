"use client";
import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  Outlet,
  Link,
  useNavigation,
  Form,
  redirect,
  useNavigate,
} from "react-router-dom/dist/umd/react-router-dom.development";
import classNames from "classnames";
import "./NavBarStyle.css";
import Footer from "../Footer/Footer";
import user from "../icons/user.png";
import edit from "../icons/edit.png";
import settings from "../icons/settings.png";
// import { HiLogout, HiViewGrid } from "react-icons/hi";
import { Dropdown } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";

export default function NavBar() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const navigate = useNavigate();

  const outletClasses = classNames(
    "mx-auto max-w-4xl sm:px-12 px-4 transition-opacity",
    {
      "opacity-100": navigation.state !== "loading",
      "opacity-50": navigation.state === "loading",
    }
  );

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
    setTimeout(() => {
      navigate("/login");
      console.log("triggering redirect");
    }, 0);
    console.log(currentUser);
    console.log("logging out!!");
  };

  return (
    <>
      <div className="entire-page">
        <div className="headerBar">
          <Link to="/" className="flex h-full">
            <img
              className="logo"
              src="/src/assets/socialbites-logo.png"
              alt="logo"
            />
          </Link>
          <div className="right">
            <div className="nav-menu">
              <ul className="nav-menu-list">
                <li className="nav-menu-item">
                  <Link to="/aboutapp">About</Link>
                </li>
                <li className="nav-menu-item">
                  <Link to="/faq">FAQ</Link>
                </li>
                <li className="nav-menu-item">
                  <Link to="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>
            {currentUser ? (
              <Form method="post" onSubmit={handleLogout}>
                <button type="submit" className="logout">
                  Logout
                </button>
              </Form>
            ) : (
              <Link to="/login" className="login">
                Log in
              </Link>
            )}

            {/* Dropdown */}

            {/* <button
              id="dropdownUserAvatarButton"
              data-dropdown-toggle="dropdownAvatar"
              className="flex m-2 bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              type="button"
            >
              <img
                className="w-8 h-8 rounded-full"
                src="/src/assets/default-avatar.webp"
                alt="user photo"
              />
            </button>

            <div
              id="dropdownAvatar"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div className="block flex flex-row gap-1">
                  <img src={user} className="w-5" />
                  Username
                </div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownUserAvatarButton"
              >
                <li>
                  <Link
                    to="/restaurant"
                    className="block flex flex-row gap-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <img src={edit} className="w-5" />
                    Restaurant Page
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="block flex flex-row gap-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <img src={settings} className="w-5" />
                    Settings
                  </Link>
                </li>
              </ul>
              <div className="py-2">
                <Form
                  method="post"
                  onSubmit={handleLogout}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <button type="submit" className="flex flex-row gap-1">
                    {" "}
                    <HiLogout className="mt-1" />
                    Logout
                  </button>
                </Form>
              </div>
            </div> */}

            <Dropdown>
              <Dropdown.Header>
                <span className="block text-sm">Username</span>
              </Dropdown.Header>
              <Link
                to="/settings"
                className="block flex flex-row gap-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <img src={settings} className="w-5" />
                Settings
              </Link>
              <Link
                to="/restaurant"
                className="block flex flex-row gap-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <img src={edit} className="w-5" />
                Restaurant Page
              </Link>
              <Dropdown.Divider />
              <Form
                method="post"
                onSubmit={handleLogout}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <button type="submit" className="flex flex-row gap-1">
                  {" "}
                  <HiLogout className="mt-1" />
                  Logout
                </button>
              </Form>
            </Dropdown>
          </div>
        </div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
