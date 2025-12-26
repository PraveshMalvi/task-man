import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);
  return (
    <nav className="navbar navbar-expand-lg bg-gray-700 fixed-top">
      <div className="container-fluid sm:px-10">
        <NavLink className="navbar-brand font-extrabold text-white" to="/">
          TaskMan.
        </NavLink>
        <div
          onClick={handleToggle}
          className="flex flex-col gap-1 ms-auto cursor-pointer sm:hidden relative"
        >
          <div
            className={`w-8 h-1 bg-gray-300 rounded ${
              isOpen
                ? "rotate-45 duration-500 absolute top-0 "
                : "rotate-0 duration-500"
            }`}
          ></div>
          {!isOpen && <div className="w-8 h-1 bg-gray-300 rounded"></div>}
          <div
            className={`w-8 h-1 bg-gray-300 rounded ${
              isOpen ? "-rotate-45 duration-500" : "rotate-0 duration-500"
            }`}
          ></div>
          {isOpen && (
            <ul className="sm:hidden flex flex-col gap-4 ms-auto mb-2 mb-lg-0 bg-white shadow-lg absolute top-8 right-0 p-4 rounded z-10">
              <li
                className="nav-item hover:text-gray-400"
                onClick={handleToggle}
              >
                <NavLink className="nav-link active" to="/">
                  All Tasks
                </NavLink>
              </li>
              <li
                className="nav-item hover:text-gray-400"
                onClick={handleToggle}
              >
                <NavLink className="nav-link" to="/completed">
                  Completed
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <ul className="sm:flex hidden flex-row gap-4 ms-auto mb-2 mb-lg-0 ">
          <li className="nav-item text-white/90 hover:text-gray-400">
            <NavLink className="nav-link" to="/">
              All Tasks
            </NavLink>
          </li>
          <li className="nav-item text-white/90 hover:text-gray-400">
            <NavLink className="nav-link" to="/completed">
              Completed
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
