import { useState } from "react";
import { motion } from "framer-motion";
import { PhoneCall, MessageCircle } from "lucide-react";
import Footer from "../components/Footer";
import contact from "../data/contact";

function RequestTow() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vehicleType: "",
    otherVehicleType: "",
    vehicleModel: "",
    location: "",
    issue: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });

    // Clear the custom vehicle type when user selects something else
    if (name === "vehicleType" && value !== "Others") {
      setFormData((prev) => ({
        ...prev,
        vehicleType: value,
        otherVehicleType: "",
      }));

      setErrors((prev) => ({
        ...prev,
        vehicleType: "",
        otherVehicleType: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    let newErrors = {};

    Object.keys(formData).forEach((field) => {
      // otherVehicleType is handled separately below
      if (field !== "otherVehicleType" && !formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    // Require custom vehicle type when "Others" is selected
    if (
      formData.vehicleType === "Others" &&
      !formData.otherVehicleType.trim()
    ) {
      newErrors.otherVehicleType = "Please specify your vehicle type";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // alert(
    //   "Your tow request has been submitted. BiG23 will contact you shortly."
    // );

    setSuccess(true);
    setLoading(false);

    // Reset form after successful submission
    setFormData({
      name: "",
      phone: "",
      vehicleType: "",
      otherVehicleType: "",
      vehicleModel: "",
      location: "",
      issue: "",
    });

    setErrors({});
  };

  return (
    <>
    {success && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="w-[90%] max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">

      <h2 className="text-2xl font-bold text-green-600">
        Request Submitted!
      </h2>

      <p className="mt-3 text-gray-600">
        Your tow request has been submitted successfully.
        BiG23 will contact you shortly.
      </p>

      <button
        onClick={() => setSuccess(false)}
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Close
      </button>

    </div>
  </div>
)}
      <section className="overflow-hidden bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">

          {/* Heading */}

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
              ease: "easeOut",
            }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <p className="font-semibold uppercase tracking-widest text-blue-600">
              Request Assistance
            </p>

            <h1 className="mt-3 text-4xl font-bold text-slate-900">
              Request a Tow
            </h1>

            <p className="mt-5 text-gray-600">
              Provide your details and vehicle information.
              Our team will contact you as soon as possible.
            </p>
          </motion.div>


          {/* Main Content */}

          <div className="grid gap-10 lg:grid-cols-3">

            {/* Form */}

            <motion.div
              initial={{
                opacity: 0,
                x: -50,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: "easeOut",
              }}
              className="rounded-3xl bg-white p-8 shadow-lg lg:col-span-2"
            >
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* Name + Phone */}

                <div className="grid gap-6 md:grid-cols-2">

                  <div>
                    <label className="mb-2 block font-medium">
                      Full Name
                    </label>

                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.name}
                      </p>
                    )}
                  </div>


                  <div>
                    <label className="mb-2 block font-medium">
                      Phone Number
                    </label>

                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel"
                      className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                </div>


                {/* Vehicle Type + Vehicle Model */}

                <div className="grid gap-6 md:grid-cols-2">

                  {/* Vehicle Type */}

                  <div>
                    <label className="mb-2 block font-medium">
                      Vehicle Type
                    </label>

                    <select
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 ${
                        !formData.vehicleType ? "text-gray-400" : "text-gray-900"
                      }`}
                    >
                      <option value="" disabled>
                        Select vehicle type
                      </option>

                      <option value="Car">Car</option>
                      <option value="SUV">SUV</option>
                      <option value="Truck">Truck</option>
                      <option value="Motorcycle">Motorcycle</option>
                      <option value="Others">Others</option>
                    </select>

                    {errors.vehicleType && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.vehicleType}
                      </p>
                    )}

                    {/* Other Vehicle Type */}

                    {formData.vehicleType === "Others" && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                          y: -10,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                          y: 0,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        className="mt-4"
                      >
                        <label className="mb-2 block font-medium">
                          Specify Vehicle Type
                        </label>

                        <input
                          name="otherVehicleType"
                          value={formData.otherVehicleType}
                          onChange={handleChange}
                          type="text"
                          placeholder="e.g. Van, Bus, Trailer"
                          className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />

                        {errors.otherVehicleType && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.otherVehicleType}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </div>


                  {/* Vehicle Model */}

                  <div>
                    <label className="mb-2 block font-medium">
                      Vehicle Model
                    </label>

                    <input
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleChange}
                      type="text"
                      className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.vehicleModel && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.vehicleModel}
                      </p>
                    )}
                  </div>

                </div>


                {/* Location */}

                <div>
                  <label className="mb-2 block font-medium">
                    Location
                  </label>

                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    type="text"
                    className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />

                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.location}
                    </p>
                  )}
                </div>


                {/* Issue */}

                <div>
                  <label className="mb-2 block font-medium">
                    Describe the issue
                  </label>

                  <textarea
                    name="issue"
                    value={formData.issue}
                    onChange={handleChange}
                    rows="5"
                    className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  ></textarea>

                  {errors.issue && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.issue}
                    </p>
                  )}
                </div>


                {/* Submit */}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="w-full rounded-lg bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg"
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </motion.button>

              </form>
            </motion.div>


            {/* Emergency Contact Card */}

            <motion.div
              initial={{
                opacity: 0,
                x: 50,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease: "easeOut",
              }}
              className="rounded-3xl bg-blue-600 p-8 text-white"
            >

              <h2 className="text-2xl font-bold">
                Need Immediate Help?
              </h2>

              <p className="mt-4 text-blue-100">
                Our emergency towing team is available 24/7.
              </p>

              <div className="mt-8 space-y-4">

                <motion.a
                  href={`tel:${contact.phone}`}
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="flex items-center gap-3 rounded-lg bg-white px-5 py-4 font-semibold text-blue-600 transition-shadow hover:shadow-lg"
                >
                  <PhoneCall />
                  Call Now
                </motion.a>


                <motion.a
                  href={`https://wa.me/${contact.whatsapp}`}
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="flex items-center gap-3 rounded-lg border border-white px-5 py-4 font-semibold transition hover:bg-white hover:text-blue-600"
                >
                  <MessageCircle />
                  WhatsApp
                </motion.a>

              </div>

            </motion.div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default RequestTow;