import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import flatBedTruck from "../assets/images/flat-bed-truck.jpg";
import contact from "../data/contact";

function Hero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${flatBedTruck})`,
      }}
    >
      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/65 to-black/45"></div>

      {/* Background Zoom */}

      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 10,
          ease: "easeOut",
        }}
        className="absolute inset-0"
      />

      {/* Content */}

      <div className="relative z-10 flex min-h-screen items-center pt-24">
        <div className="mx-auto max-w-7xl px-6">

          {/* Small Title */}

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="mb-5 text-lg font-semibold uppercase tracking-[0.3em] text-blue-400"
          >
            24/7 Emergency Towing Service
          </motion.p>

          {/* Heading */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
            className="max-w-4xl text-5xl font-extrabold leading-tight text-white md:text-7xl"
          >
            Fast, Reliable Roadside Assistance Whenever You Need It
          </motion.h1>

          {/* Paragraph */}

          <motion.p
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.35,
            }}
            className="mt-8 max-w-2xl text-lg leading-8 text-gray-200"
          >
            BiG23 provides professional emergency towing and roadside
            assistance across Nigeria and selected West African routes.
            We're available 24/7 to get you back on the road safely.
          </motion.p>

          {/* Buttons */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.55,
            }}
            className="my-10 flex flex-wrap gap-5"
          >
            <Link
              to="/request-tow"
              className="rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-[0_10px_30px_rgba(37,99,235,0.45)] active:scale-95"
            >
              Request a Tow
            </Link>

            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-slate-900 active:scale-95"
            >
              WhatsApp
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Hero;