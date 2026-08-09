import { motion } from "framer-motion";
import {
  Clock3,
  ShieldCheck,
  Truck,
  MapPinned,
} from "lucide-react";

function WhyChoose() {
  const features = [
    {
      icon: <Truck size={36} />,
      title: "Fast Response",
      description:
        "Quick dispatch to get help on the way as soon as your request is received.",
    },
    {
      icon: <ShieldCheck size={36} />,
      title: "Professional Service",
      description:
        "Reliable towing handled carefully by experienced operators.",
    },
    {
      icon: <MapPinned size={36} />,
      title: "Regional Coverage",
      description:
        "Serving Nigeria and selected routes across Benin, Togo, and Ghana.",
    },
    {
      icon: <Clock3 size={36} />,
      title: "Available 24/7",
      description:
        "Emergency towing assistance whenever you need it; day or night.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            Why Choose BiG23
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Reliable Towing You Can Count On
          </h2>

          <p className="mt-5 text-gray-600">
            We focus on quick response, dependable service,
            and helping drivers get back on the road safely.
          </p>
        </motion.div>


        {/* Feature Cards */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
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
              className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-2xl"
            >

              {/* Icon */}

              <motion.div
                whileHover={{
                  scale: 1.1,
                  rotate: 3,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white"
              >
                {feature.icon}
              </motion.div>


              {/* Title */}

              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                {feature.title}
              </h3>


              {/* Description */}

              <p className="leading-7 text-gray-600">
                {feature.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default WhyChoose;