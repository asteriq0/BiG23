import { motion } from "framer-motion";
import Footer from "../components/Footer";

function PrivacyPolicy() {
  return (
    <>
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
            Legal
          </p>

          <h1 className="mt-4 text-5xl font-bold">
            Privacy Policy
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-blue-100">
            Learn how BiG23 collects, uses, and protects the information you
            provide while using our services.
          </p>
        </motion.div>
      </motion.section>

      {/* Content */}

      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl space-y-14 px-6">

          {[
            {
              title: "1. Information We Collect",
              text:
                "When you use our website or request towing assistance, we may collect information such as your name, phone number, email address, vehicle details, pickup location, destination, and any other information you voluntarily provide.",
            },
            {
              title: "2. How We Use Your Information",
              text:
                "The information we collect is used to process towing requests, communicate with you, provide customer support, improve our services, and maintain the security and reliability of our platform.",
            },
            {
              title: "3. Information Sharing",
              text:
                "BiG23 does not sell your personal information. We may share relevant information only with personnel or service providers directly involved in delivering the requested towing service or where required by law.",
            },
            {
              title: "4. Data Security",
              text:
                "We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. While we strive to safeguard your data, no online system can guarantee absolute security.",
            },
            {
              title: "5. Cookies and Website Usage",
              text:
                "Our website may use cookies or similar technologies to improve user experience, remember preferences, and analyze website performance.",
            },
            {
              title: "6. Your Rights",
              text:
                "You may request access to, correction of, or deletion of your personal information where applicable. Requests can be made by contacting BiG23 through the details provided on our Contact page.",
            },
            {
              title: "7. Changes to This Policy",
              text:
                "This Privacy Policy may be updated periodically to reflect changes in our services, legal requirements, or operational practices. Any updates will be published on this page.",
            },
            {
              title: "8. Contact Us",
              text:
                "If you have any questions regarding this Privacy Policy or how your information is handled, please contact BiG23 through the Contact page.",
            },
          ].map((section, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 30,
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
                delay: index * 0.08,
                ease: "easeOut",
              }}
            >
              <h2 className="text-2xl font-bold text-slate-900">
                {section.title}
              </h2>

              <p className="mt-4 leading-8 text-gray-600">
                {section.text}
              </p>
            </motion.div>
          ))}

        </div>
      </section>

      <Footer />
    </>
  );
}

export default PrivacyPolicy;