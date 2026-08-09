import { motion } from "framer-motion";
import {
  PhoneCall,
  Truck,
  MapPinned,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

function HowItWorks() {
  const steps = [
    {
      icon: <PhoneCall size={36} />,
      title: "Request Assistance",
      description:
        "Submit a tow request online or contact us by phone or WhatsApp with your location and vehicle details.",
    },
    {
      icon: <Truck size={36} />,
      title: "Driver Assigned",
      description:
        "Our dispatcher assigns the nearest available tow truck to your request for a faster response.",
    },
    {
      icon: <MapPinned size={36} />,
      title: "Track Your Driver",
      description:
        "Receive updates and track your assigned tow truck in real time as it heads to your location.",
    },
    {
      icon: <CheckCircle2 size={36} />,
      title: "You're Back on the Road",
      description:
        "Our driver safely tows or assists your vehicle so you can continue your journey with confidence.",
    },
  ];

  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            How It Works
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Getting Help Is Simple
          </h2>

          <p className="mt-5 text-gray-600">
            From requesting assistance to tracking your driver, we've made
            the entire towing process straightforward and stress-free.
          </p>
        </motion.div>


        {/* Steps */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {steps.map((step, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 45,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.65,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              whileHover={{
                y: -10,
                transition: {
                  duration: 0.25,
                },
              }}
              className="group relative rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-shadow duration-300 hover:shadow-2xl"
            >

              {/* Step Number */}

              <span className="absolute right-5 top-5 text-5xl font-black text-gray-100 transition-colors duration-300 group-hover:text-blue-50">
                0{index + 1}
              </span>


              {/* Icon */}

              <motion.div
                whileHover={{
                  scale: 1.1,
                  rotate: 3,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white"
              >
                {step.icon}
              </motion.div>


              {/* Title */}

              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                {step.title}
              </h3>


              {/* Description */}

              <p className="leading-7 text-gray-600">
                {step.description}
              </p>

            </motion.div>

          ))}

        </div>


        {/* CTA */}

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
            duration: 0.7,
            delay: 0.2,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="mt-16 text-center"
        >
          <Link
            to="/request-tow"
            className="inline-block rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-[0_10px_30px_rgba(37,99,235,0.35)] active:scale-95"
          >
            Request a Tow
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

export default HowItWorks;