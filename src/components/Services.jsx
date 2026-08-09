import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Truck,
  Clock3,
  ShieldCheck,
  PhoneCall,
} from "lucide-react";
import emergencyTowTruck from "../assets/images/emergency-tow-truck.jpg";
import contact from "../data/contact";

function Services() {
  const features = [
    {
      icon: <Truck />,
      title: "Professional Towing",
      description:
        "Safe transportation for cars, SUVs and light-duty vehicles.",
    },
    {
      icon: <Clock3 />,
      title: "Available 24/7",
      description:
        "Day or night, we're ready whenever you need assistance.",
    },
    {
      icon: <ShieldCheck />,
      title: "Reliable & Secure",
      description:
        "Your vehicle is handled carefully from pickup to destination.",
    },
  ];

  return (
    <section className="overflow-hidden bg-slate-50 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        {/* Left Side - Image */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="overflow-hidden rounded-1xl"
        >
          <motion.img
            src={emergencyTowTruck}
            alt="Emergency Tow Truck"
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            className="h-full min-h-[400px] w-full object-cover shadow-xl"
          />
        </motion.div>


        {/* Right Side - Content */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
        >

          {/* Section Label */}

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.15,
            }}
            viewport={{ once: true }}
            className="font-semibold uppercase tracking-widest text-blue-600"
          >
            Our Service
          </motion.p>


          {/* Heading */}

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            viewport={{ once: true }}
            className="mt-3 text-4xl font-bold leading-tight text-slate-900"
          >
            24/7 Emergency Towing & Roadside Assistance
          </motion.h2>


          {/* Description */}

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
            viewport={{ once: true }}
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            Whether your vehicle has broken down, been involved in an
            accident, or needs safe transportation, BiG23 is available
            around the clock to provide fast, dependable towing services
            across Nigeria and selected West African routes.
          </motion.p>


          {/* Features */}

          <div className="mt-10 space-y-5">

            {features.map((feature, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + index * 0.12,
                  ease: "easeOut",
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                whileHover={{ x: 6 }}
                className="group flex items-start gap-4"
              >

                {/* Icon */}

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  {feature.icon}
                </div>


                {/* Text */}

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-1 text-gray-600">
                    {feature.description}
                  </p>
                </div>

              </motion.div>

            ))}

          </div>


          {/* Buttons */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.8,
            }}
            viewport={{
              once: true,
            }}
            className="mt-10 flex flex-wrap gap-4"
          >

            <Link
              to="/request-tow"
              className="rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-[0_10px_30px_rgba(37,99,235,0.35)] active:scale-95"
            >
              Request a Tow
            </Link>


            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-2 rounded-lg border border-blue-600 px-8 py-4 font-semibold text-blue-600 transition-all duration-300 hover:scale-105 hover:bg-blue-50 active:scale-95"
            >
              <PhoneCall size={18} />
              Call Now
            </a>

          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}

export default Services;