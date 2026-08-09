import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import Footer from "../components/Footer";
import contact from "../data/contact";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSuccess(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: <Phone size={28} />,
      title: "Phone",
      text: contact.phone,
    },
    {
      icon: <MessageCircle size={28} />,
      title: "WhatsApp",
      text: "Available 24/7",
    },
    {
      icon: <Mail size={28} />,
      title: "Email",
      text: contact.email,
    },
    {
      icon: <MapPin size={28} />,
      title: "Coverage",
      text: "Nigeria & West Africa",
    },
  ];

  return (
    <>
      {/* Success Popup */}

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.85,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.15,
                  type: "spring",
                  stiffness: 200,
                }}
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600"
              >
                ✓
              </motion.div>

              <h2 className="mt-5 text-2xl font-bold text-green-600">
                Message Sent!
              </h2>

              <p className="mt-3 text-gray-600">
                Thank you for contacting BiG23.
                We will get back to you shortly.
              </p>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSuccess(false)}
                className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-blue-600 py-20 text-white"
      >
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
            duration: 0.7,
            delay: 0.1,
          }}
          className="mx-auto max-w-7xl px-6 text-center"
        >
          <p className="font-semibold uppercase tracking-widest text-blue-200">
            Contact Us
          </p>

          <h1 className="mt-4 text-5xl font-bold">
            Get In Touch With Big23
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-blue-100">
            Have questions or need assistance?
            Our team is ready to help.
          </p>
        </motion.div>
      </motion.section>

      {/* Contact Information */}

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {contactInfo.map((item, index) => (
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
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -8,
                }}
                className="rounded-2xl bg-slate-50 p-8 text-center shadow-sm transition-shadow hover:shadow-xl"
              >
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                  }}
                  className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600"
                >
                  {item.icon}
                </motion.div>

                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 text-gray-600">
                  {item.text}
                </p>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* Form */}

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-12 lg:grid-cols-2">

            {/* Text */}

            <motion.div
              initial={{
                opacity: 0,
                x: -40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
            >
              <p className="font-semibold uppercase tracking-widest text-blue-600">
                Send A Message
              </p>

              <h2 className="mt-4 text-4xl font-bold text-slate-900">
                How Can We Help?
              </h2>

              <p className="mt-6 text-gray-600">
                Send us a message and our team will respond as soon
                as possible.
              </p>

              <div className="mt-8 flex gap-3 text-gray-700">
                <Clock className="text-blue-600" />

                <span>
                  Customer Support Available 24/7
                </span>
              </div>
            </motion.div>

            {/* Form */}

            <motion.div
              initial={{
                opacity: 0,
                x: 40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
              className="rounded-3xl bg-white p-8 shadow-lg"
            >
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                <div>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 ${
                      errors.name ? "border-red-500" : ""
                    }`}
                  />

                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email Address"
                    className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    placeholder="Phone Number"
                    className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                  />

                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Your Message"
                    className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 ${
                      errors.message ? "border-red-500" : ""
                    }`}
                  ></textarea>

                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="w-full rounded-lg bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg"
                >
                  Send Message
                </motion.button>

              </form>
            </motion.div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contact;