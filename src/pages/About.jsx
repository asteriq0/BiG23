import { motion } from "framer-motion";
import {
  Clock3,
  ShieldCheck,
  MapPinned,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import aboutTruck from "../assets/images/big23-tow-truck-transportation.webp"
import Footer from "../components/Footer";

function About() {
  const values = [
    {
      icon: <Truck size={32} />,
      title: "Reliable Assistance",
      description:
        "Providing dependable towing support when drivers need help the most.",
    },
    {
      icon: <Clock3 size={32} />,
      title: "Available 24/7",
      description:
        "Vehicle emergencies can happen anytime, so our support is always available.",
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Safe Service",
      description:
        "We prioritize careful handling of every vehicle during transportation.",
    },
    {
      icon: <MapPinned size={32} />,
      title: "Regional Coverage",
      description:
        "Serving customers across Nigeria and selected West African routes.",
    },
  ];

  return (
    <>
      {/* Hero */}

      <section className="overflow-hidden bg-blue-600 py-28 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">

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
              duration: 0.6,
            }}
            className="font-semibold uppercase tracking-widest text-blue-200"
          >
            About BiG23
          </motion.p>

          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
            className="mx-auto mt-4 max-w-4xl text-5xl font-bold leading-tight md:text-6xl"
          >
            Helping Drivers When They Need Us Most
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
            className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-100"
          >
            BiG23 provides 24/7 emergency towing assistance designed
            to help drivers handle unexpected vehicle situations safely
            and efficiently.
          </motion.p>

        </div>
      </section>


      {/* Who We Are */}

      <section className="overflow-hidden bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">

          {/* Image */}

          <motion.div
            initial={{
              opacity: 0,
              x: -60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            viewport={{
              once: true,
              amount: 0.75,
            }}
            className="overflow-hidden rounded-1xl shadow-lg"
          >
            <motion.img
              src={aboutTruck}
              alt="BiG23"
              initial={{
                scale: 1.08,
              }}
              whileInView={{
                scale: 1,
              }}
              transition={{
                duration: 1.4,
                ease: "easeOut",
              }}
              viewport={{
                once: true,
              }}
              className="w-full h-full object-cover"
            />
          </motion.div>


          {/* Content */}

          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
          >

            <h2 className="text-4xl font-bold text-slate-900">
              Who We Are
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              BiG23 is an emergency towing and roadside assistance
              company focused on providing fast and reliable help
              for drivers facing vehicle problems.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Our goal is to make roadside emergencies less stressful
              by connecting customers with professional towing support
              whenever they need it.
            </p>

          </motion.div>

        </div>
      </section>


      {/* Mission */}

      <section className="overflow-hidden bg-slate-50 py-24">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="mx-auto max-w-4xl px-6 text-center"
        >

          <h2 className="text-4xl font-bold text-slate-900">
            Our Mission
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            To provide dependable emergency towing services that
            prioritize customer safety, quick response, and reliable
            vehicle assistance across our service areas.
          </p>

        </motion.div>
      </section>


      {/* Values */}

      <section className="overflow-hidden bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            className="mb-14 text-center"
          >
            <h2 className="text-4xl font-bold text-slate-900">
              Why Choose BiG23
            </h2>
          </motion.div>


          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {values.map((value, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
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
                className="rounded-2xl border bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-2xl"
              >

                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotate: 3,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors duration-300 hover:bg-blue-600 hover:text-white"
                >
                  {value.icon}
                </motion.div>

                <h3 className="text-xl font-semibold text-slate-900">
                  {value.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {value.description}
                </p>

              </motion.div>

            ))}

          </div>

        </div>
      </section>


      {/* CTA */}

      <section className="overflow-hidden bg-blue-600 py-16 text-center text-white">

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
        >

          <h2 className="text-3xl font-bold">
            Need Emergency Towing Assistance?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            BiG23 is ready to assist you whenever you need help.
          </p>

          <Link
            to="/request-tow"
            className="mt-8 inline-block rounded-lg bg-white px-8 py-4 font-semibold text-blue-600 transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-lg active:scale-95"
          >
            Request a Tow
          </Link>

        </motion.div>

      </section>


      <Footer />
    </>
  );
}

export default About;