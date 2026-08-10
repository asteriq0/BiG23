import { motion } from "framer-motion";
import Footer from "../components/Footer";

function TermsConditions() {
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
            Terms & Conditions
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-blue-100">
            Please read these Terms & Conditions carefully before using the
            BiG23 website or requesting our services.
          </p>
        </motion.div>
      </motion.section>

      {/* Content */}

      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl space-y-14 px-6">

          {[
            {
              title: "1. Acceptance of These Terms",
              text:
                "By accessing or using the BiG23 website or requesting our services, you agree to comply with these Terms & Conditions. If you do not agree, please do not use our website or services.",
            },
            {
              title: "2. Our Services",
              text:
                "BiG23 provides towing and roadside assistance services. Service availability may depend on your location, vehicle type, weather conditions, traffic, operational capacity, and other circumstances.",
            },
            {
              title: "3. Customer Responsibilities",
              text:
                "You agree to provide accurate information when requesting assistance, including your contact details, vehicle information, and location. Providing incorrect or misleading information may delay or affect service delivery.",
            },
            {
              title: "4. Service Availability",
              text:
                "Although BiG23 strives to provide prompt assistance, arrival times cannot be guaranteed and may vary depending on operational and external conditions.",
            },
            {
              title: "5. Pricing and Payment",
              text:
                "Service charges will be communicated before or during the service process where applicable. Payment arrangements will be provided by BiG23 using the available payment methods at the time of service.",
            },
            {
              title: "6. Limitation of Liability",
              text:
                "BiG23 will take reasonable care in providing its services. However, we are not responsible for delays or circumstances beyond our reasonable control, including severe weather, road closures, accidents, or other unforeseen events.",
            },
            {
              title: "7. Website Use",
              text:
                "You agree not to misuse the website, attempt unauthorized access, interfere with its operation, or use it for unlawful activities.",
            },
            {
              title: "8. Changes to These Terms",
              text:
                "BiG23 may update these Terms & Conditions from time to time. Any changes will be published on this page and become effective upon posting.",
            },
            {
              title: "9. Contact Us",
              text:
                "If you have questions regarding these Terms & Conditions, please contact BiG23 through the Contact page.",
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

export default TermsConditions;