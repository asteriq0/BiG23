import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import truckLogo from "../assets/icons/pickup-truck.svg";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Tracking", path: "/tracking" },
    { name: "Request Tow", path: "/request-tow" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-xl py-2"
          : "bg-white shadow-md py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={truckLogo}
            alt="BiG23 towing truck"
            className={`transition-all duration-300 ${
              scrolled ? "h-8 w-8" : "h-10 w-10"
            }`}
          />

          <span
            className={`font-bold text-blue-600 transition-all duration-300 ${
              scrolled ? "text-xl" : "text-2xl"
            }`}
          >
            BiG23
          </span>
        </NavLink>

        {/* Desktop Navigation */}

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `font-medium transition-all duration-300 ${
                  scrolled ? "text-sm" : "text-base"
                } ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-1 transition hover:bg-gray-100 md:hidden"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Dropdown */}

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          open ? "max-h-96 border-t" : "max-h-0"
        }`}
      >
        <div className="bg-white px-6 py-5">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-medium transition ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;