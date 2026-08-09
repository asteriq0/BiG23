import { motion } from "framer-motion";
import { CheckCircle2, MapPinned } from "lucide-react";
import westAfricaMap from "../assets/images/west-africa-map.webp";

function Coverage() {
  const countries = [
    "Nigeria",
    "Benin",
    "Togo",
    "Ghana",
  ];

  const benefits = [
    "24/7 Emergency Assistance",
    "Fast Dispatch & Response",
    "Professional Towing Service",
  ];

  return (
    <section className="overflow-hidden bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

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
            ease: "easeOut",
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            Coverage Area
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Serving Drivers Across West Africa
          </h2>

          <p className="mt-5 text-gray-600">
            BiG23 provides dependable emergency towing services across
            Nigeria and selected neighboring countries.
          </p>
        </motion.div>


        {/* Main Content */}

        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Map */}

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
            className="overflow-hidden rounded-3xl shadow-lg"
          >
            <motion.img
              src={westAfricaMap}
              alt="BiG23 coverage area across West Africa"
              initial={{
                scale: 1.08,
              }}
              whileInView={{
                scale: 1,
              }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
              }}
              viewport={{
                once: true,
              }}
              className="w-full"
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

            {/* Countries */}

            <div className="grid grid-cols-2 gap-4">

              {countries.map((country, index) => (

                <motion.div
                  key={country}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.12,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  whileHover={{
                    y: -5,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  className="group flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-lg"
                >
                  <MapPinned
                    className="text-blue-600 transition-transform duration-300 group-hover:scale-110"
                  />

                  <span className="font-medium text-slate-900">
                    {country}
                  </span>
                </motion.div>

              ))}

            </div>


            {/* Benefits */}

            <div className="mt-10 space-y-4">

              {benefits.map((benefit, index) => (

                <motion.div
                  key={benefit}
                  initial={{
                    opacity: 0,
                    x: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.12,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="shrink-0 text-green-600" />

                  <span className="text-slate-700">
                    {benefit}
                  </span>
                </motion.div>

              ))}

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default Coverage;