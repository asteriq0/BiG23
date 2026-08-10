import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import truckLogo from "../assets/icons/pickup-truck.svg";
import contact from "../data/contact";
import { path } from "framer-motion/client";

function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Request a Tow", path: "/request-tow" },
    { name: "Track Tow", path: "/tracking" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy-policy"},
    { name: "Terms & Conditions", path: "/terms-conditions" },
  ];

  const services = [
    "Emergency Towing",
    "Vehicle Recovery",
    "Roadside Assistance",
    "Accident Assistance",
  ];

  return (
    <footer className="bg-slate-900 text-white">

      {/* Main Footer */}

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">

        {/* Company Info */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          <div className="flex items-center gap-2">

            <img
              src={truckLogo}
              alt="BiG23 towing truck"
              className="h-10 w-10 brightness-0 invert"
            />

            <span className="text-2xl font-bold text-blue-600">
              BiG 23
            </span>

          </div>

          <p className="mt-5 leading-7 text-gray-400">
            Reliable 24/7 emergency towing and roadside assistance
            across Nigeria and selected West African routes.
          </p>
        </motion.div>


        {/* Quick Links */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          <h3 className="mb-5 text-lg font-semibold">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">

            {quickLinks.map((link) => (
              <li key={link.name}>

                <Link
                  to={link.path}
                  className="transition-colors duration-300 hover:text-blue-400"
                >
                  {link.name}
                </Link>

              </li>
            ))}

          </ul>
        </motion.div>


        {/* Services */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          <h3 className="mb-5 text-lg font-semibold">
            Services
          </h3>

          <ul className="space-y-3 text-gray-400">

            {services.map((service) => (
              <li
                key={service}
                className="transition-colors duration-300 hover:text-blue-400"
              >
                {service}
              </li>
            ))}

          </ul>
        </motion.div>


        {/* Contact */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.3,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          <h3 className="mb-5 text-lg font-semibold">
            Contact
          </h3>

          <ul className="space-y-4 text-gray-400">

            <li className="flex items-start gap-3">
              <Phone
                size={20}
                className="mt-0.5 shrink-0"
              />

              <span>
                {contact.phone}
              </span>
            </li>

            <li className="flex items-start gap-3">
              <MessageCircle
                size={20}
                className="mt-0.5 shrink-0"
              />

              <span>
                {contact.whatsapp}
              </span>
            </li>

            <li className="flex items-start gap-3">
              <MapPin
                size={20}
                className="mt-0.5 shrink-0"
              />

              <span>
                Nigeria & West Africa
              </span>
            </li>

            <li className="flex items-start gap-3">
              <Mail
                size={20}
                className="mt-0.5 shrink-0"
              />

              <span>
                {contact.email}
              </span>
            </li>

          </ul>
        </motion.div>

      </div>


      {/* Bottom Bar */}

      <div className="border-t border-gray-800">

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
          }}
          viewport={{
            once: true,
          }}
          className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-gray-500 md:flex-row"
        >

          <p>
            &copy; {new Date().getFullYear()} BiG23. All rights reserved.
          </p>

          <p>
            24/7 Emergency Towing Assistance
          </p>

        </motion.div>

      </div>

    </footer>
  );
}

export default Footer;