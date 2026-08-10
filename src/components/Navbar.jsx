import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import truckLogo from "../assets/icons/pickup-truck.svg";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  const isLegalPage =
    location.pathname === "/privacy-policy" ||
    location.pathname === "/terms-conditions";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
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
          ? "bg-white/90 py-2 shadow-xl backdrop-blur-md"
          : "bg-white py-5 shadow-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <NavLink
          to="/"
          className="flex items-center gap-2"
        >
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

        <div className="hidden items-center gap-7 md:flex">

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

          {/* Legal Dropdown */}

          <div className="group relative">

            <button
              className={`flex items-center gap-1 font-medium transition-all duration-300 ${
                scrolled ? "text-sm" : "text-base"
              } ${
                isLegalPage
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Legal

              <ChevronDown
                size={18}
                className="transition-transform duration-300 group-hover:rotate-180"
              />
            </button>

            <div
              className="
                invisible absolute right-0 z-50 mt-4 w-60
                translate-y-3 rounded-xl border border-gray-100
                bg-white py-2 opacity-0 shadow-2xl
                transition-all duration-300 ease-out
                group-hover:visible
                group-hover:translate-y-0
                group-hover:opacity-100
              "
            >
              <NavLink
                to="/privacy-policy"
                className={({ isActive }) =>
                  `block px-5 py-3 transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 pl-7 font-semibold text-blue-600"
                      : "text-gray-700 hover:bg-blue-50 hover:pl-7 hover:text-blue-600"
                  }`
                }
              >
                Privacy Policy
              </NavLink>

              <NavLink
                to="/terms-conditions"
                className={({ isActive }) =>
                  `block px-5 py-3 transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 pl-7 font-semibold text-blue-600"
                      : "text-gray-700 hover:bg-blue-50 hover:pl-7 hover:text-blue-600"
                  }`
                }
              >
                Terms & Conditions
              </NavLink>

            </div>

          </div>

        </div>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setOpen(!open)}
          aria-label="Open navigation menu"
          aria-expanded={open}
          className="rounded-md p-1 transition hover:bg-gray-100 md:hidden"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>

      </div>

      {/* Mobile Menu */}

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

            <NavLink
              to="/privacy-policy"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `font-medium transition ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              Privacy Policy
            </NavLink>

            <NavLink
              to="/terms-conditions"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `font-medium transition ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              Terms & Conditions
            </NavLink>

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;