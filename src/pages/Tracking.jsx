import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Clock, MapPin, User } from "lucide-react";
import Footer from "../components/Footer";

function Tracking() {
  const [trackingId, setTrackingId] = useState("");
  const [searched, setSearched] = useState(false);
  const [towData, setTowData] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = (e) => {
    e.preventDefault();

    if (trackingId.trim() === "") {
      setError("Please enter your tracking ID.");
      return;
    }

    setError("");

    // setTowData({
      // driver: "John Doe",
      // truck: "BiG23 Truck #001",
      // estimatedArrival: "15 minutes",
      // status: "Driver is on the way",
    // });
    const mockTowData = {
      driver: "John Doe",
      truck: "BiG23 Truck #001",
      estimatedArrival: "15 minutes",
      status: "Driver is on the way",
    };

    setTowData(mockTowData);
    setSearched(true);
  };

  return (
    <>
      <section className="overflow-hidden bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">

          {/* Header */}

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
              Tracking
            </p>

            <h1 className="mt-3 text-4xl font-bold text-slate-900">
              Track Your Tow Truck
            </h1>

            <p className="mt-5 text-gray-600">
              Enter your tracking ID to view your tow request status
              and driver information.
            </p>
          </motion.div>


          {/* Search */}

          <motion.form
            onSubmit={handleTrack}
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
              delay: 0.15,
              ease: "easeOut",
            }}
            className="mx-auto mb-12 flex max-w-xl flex-col gap-4 sm:flex-row"
          >
            <div className="flex-1">
  <input
    type="text"
    placeholder="Enter tracking ID"
    value={trackingId}
    onChange={(e) => {
      setTrackingId(e.target.value);
      setError("");
    }}
    className={`w-full rounded-lg border px-5 py-4 outline-none transition focus:ring-2 ${
      error
        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
        : "border-gray-300 focus:border-blue-600 focus:ring-blue-100"
    }`}
  />

  {error && (
    <p className="mt-2 text-sm text-red-600">
      {error}
    </p>
  )}
</div>

            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg"
            >
              Track Tow
            </motion.button>
          </motion.form>


          {/* Tracking Results */}

          {searched && (
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="grid gap-10 lg:grid-cols-3"
            >

              {/* Map */}

              <motion.div
                id="map"
                initial={{
                  opacity: 0,
                  x: -40,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                }}
                className="flex h-[450px] items-center justify-center rounded-3xl bg-gray-200 lg:col-span-2"
              >
                <div className="text-center text-gray-500">

                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <MapPin
                      size={50}
                      className="mx-auto mb-4"
                    />
                  </motion.div>

                  <h3 className="text-xl font-semibold">
                    Live Map Tracking
                  </h3>

                  <p>
                    Google Maps integration will appear here.
                  </p>

                </div>
              </motion.div>


              {/* Driver Info */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 40,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                }}
                className="rounded-3xl bg-white p-8 shadow-lg"
              >
                <h2 className="mb-6 text-2xl font-bold">
                  Tow Details
                </h2>


                <div className="space-y-6">

                  {/* Driver */}

                  <motion.div
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="flex gap-4"
                  >
                    <User className="text-blue-600" />

                    <div>
                      <p className="text-sm text-gray-500">
                        Driver
                      </p>

                      <p className="font-semibold">
                        {towData?.driver}
                      </p>
                    </div>
                  </motion.div>


                  {/* Truck */}

                  <motion.div
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                    className="flex gap-4"
                  >
                    <Truck className="text-blue-600" />

                    <div>
                      <p className="text-sm text-gray-500">
                        Truck
                      </p>

                      <p className="font-semibold">
                        {towData?.truck}
                      </p>
                    </div>
                  </motion.div>


                  {/* Arrival */}

                  <motion.div
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                    className="flex gap-4"
                  >
                    <Clock className="text-blue-600" />

                    <div>
                      <p className="text-sm text-gray-500">
                        Estimated Arrival
                      </p>

                      <p className="font-semibold">
                        {towData?.estimatedArrival}
                      </p>
                    </div>
                  </motion.div>


                  {/* Status */}

                  <motion.div
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.65 }}
                    className="flex gap-4"
                  >
                    <MapPin className="text-blue-600" />

                    <div>
                      <p className="text-sm text-gray-500">
                        Status
                      </p>

                      <p className="font-semibold text-green-600">
                        {towData?.status}
                      </p>
                    </div>
                  </motion.div>

                </div>
              </motion.div>

            </motion.div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Tracking;