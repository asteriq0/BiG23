import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import towingService from "../assets/images/towing-service.jpg";
import Footer from "../components/Footer";
import services from "../data/services";

function Services() {
  

  return (
    <>
      {/* Hero */}

      <section className="overflow-hidden bg-blue-600 py-28 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-3 font-semibold uppercase tracking-[0.25em] text-blue-200"
          >
            Our Services
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
            className="mx-auto mt-4 max-w-4xl text-5xl font-bold leading-tight md:text-6xl"
          >
            Reliable Emergency Towing Assistance
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
            className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-100"
          >
            BiG23 provides dependable 24/7 towing and roadside assistance
            to help drivers get back on the road safely.
          </motion.p>

        </div>
      </section>


      {/* Main Service */}

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
              amount: 0.25,
            }}
            className="overflow-hidden rounded-1xl shadow-lg"
          >
            <motion.img
              src={towingService}
              alt="BiG23 towing service"
              initial={{ scale: 1.08 }}
              whileInView={{ scale: 1 }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="h-full w-full object-cover"
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

            <h2 className="text-4xl font-bold leading-tight text-slate-900">
              24/7 Emergency Towing
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Whether your vehicle has broken down, been involved in an
              accident, or needs transportation, BiG23 provides professional
              towing assistance whenever you need it.
            </p>

            <p className="mt-4 text-lg leading-8 text-gray-600">
              Our goal is to provide a fast response, safe vehicle handling,
              and a smooth recovery experience.
            </p>

            <Link
              to="/request-tow"
              className="mt-8 inline-block rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-[0_10px_30px_rgba(37,99,235,0.35)] active:scale-95"
            >
              Request a Tow
            </Link>

          </motion.div>

        </div>
      </section>


      {/* Assistance Cards */}

      <section className="overflow-hidden bg-slate-50 py-24">
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
              What We Provide
            </h2>

            <p className="mt-4 text-gray-600">
              Professional support designed to help during vehicle emergencies.
            </p>
          </motion.div>


          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {services.map((item, index) => (

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
                className="group rounded-2xl bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-2xl"
              >

                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotate: 3,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white"
                >
                  <item.icon size={32} />
                </motion.div>

                <h3 className="text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {item.description}
                </p>

              </motion.div>

            ))}

          </div>

        </div>
      </section>


      {/* Future Services */}

      <section className="overflow-hidden bg-white py-20">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
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
          className="mx-auto max-w-4xl px-6 text-center"
        >
          <h2 className="text-3xl font-bold text-slate-900">
            More Services Coming Soon
          </h2>

          <p className="mt-5 leading-7 text-gray-600">
            As BiG23 expands, additional roadside assistance options may
            include services such as fuel delivery, battery assistance,
            and tire support.
          </p>
        </motion.div>
      </section>


      <Footer />
    </>
  );
}

export default Services;