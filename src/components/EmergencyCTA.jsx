import { motion } from "framer-motion";
import { PhoneCall, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import contact from "../data/contact";

function EmergencyCTA() {
  return (
    <section className="overflow-hidden bg-blue-600 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.98,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="flex flex-col items-center justify-between gap-8 rounded-3xl bg-blue-700 px-8 py-12 text-center md:flex-row md:text-left"
        >

          {/* Text */}

          <div className="max-w-2xl">

            <motion.p
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.2,
              }}
              viewport={{
                once: true,
              }}
              className="font-semibold uppercase tracking-widest text-blue-200"
            >
              Need Immediate Assistance?
            </motion.p>


            <motion.h2
              initial={{
                opacity: 0,
                y: 20,
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
              }}
              className="mt-3 text-4xl font-bold leading-tight text-white"
            >
              Stuck on the Road? BiG23 Is Ready To Help.
            </motion.h2>


            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.4,
              }}
              viewport={{
                once: true,
              }}
              className="mt-5 text-lg leading-8 text-blue-100"
            >
              Our emergency towing team is available 24/7. Request
              assistance now or contact us directly.
            </motion.p>

          </div>


          {/* Buttons */}

          <motion.div
            initial={{
              opacity: 0,
              x: 35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.45,
            }}
            viewport={{
              once: true,
            }}
            className="flex flex-col gap-4 sm:flex-row"
          >

            <Link
              to="/request-tow"
              className="flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-blue-600 transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-lg active:scale-95"
            >
              <MessageCircle size={20} />
              Request a Tow
            </Link>


            <a
              href={`tel:${contact.phone}`}
              className="flex items-center justify-center gap-2 rounded-lg border border-white px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-blue-600 active:scale-95"
            >
              <PhoneCall size={20} />
              Call Now
            </a>

          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}

export default EmergencyCTA;