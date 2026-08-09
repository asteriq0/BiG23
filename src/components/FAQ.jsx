import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

function FAQ() {
  const questions = [
    {
      question: "Are you available 24/7?",
      answer:
        "Yes. BiG23 provides emergency towing assistance around the clock, including weekends and holidays.",
    },
    {
      question: "What areas do you cover?",
      answer:
        "We currently serve Nigeria and selected neighboring countries including Benin, Togo, and Ghana.",
    },
    {
      question: "How do I request a tow?",
      answer:
        "You can request assistance through our online request form, call us directly, or contact us through WhatsApp.",
    },
    {
      question: "Can I track my tow truck?",
      answer:
        "Yes. Our planned tracking feature will allow customers to view their assigned truck location and estimated arrival time.",
    },
    {
      question: "What information do I need when requesting a tow?",
      answer:
        "You'll need your location, vehicle details, the issue you're experiencing, and your contact information.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-4xl px-6">

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
          className="mb-12 text-center"
        >
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            FAQ
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-5 text-gray-600">
            Find answers to common questions about our towing services.
          </p>
        </motion.div>


        {/* Questions */}

        <div className="space-y-4">

          {questions.map((item, index) => (

            <motion.div
              key={index}
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
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                openIndex === index
                  ? "border-blue-200 shadow-md"
                  : "border-gray-200"
              }`}
            >

              {/* Question Button */}

              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between gap-6 p-6 text-left transition-colors duration-300 hover:bg-slate-50"
              >

                <span className="font-semibold text-slate-900">
                  {item.question}
                </span>

                <motion.span
                  animate={{
                    rotate: openIndex === index ? 180 : 0,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="shrink-0 text-slate-600"
                >
                  <ChevronDown />
                </motion.span>

              </button>


              {/* Answer */}

              <AnimatePresence initial={false}>

                {openIndex === index && (

                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="border-t border-gray-100 px-6 pb-6 pt-4 leading-7 text-gray-600">
                      {item.answer}
                    </div>
                  </motion.div>

                )}

              </AnimatePresence>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default FAQ;