
import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Clock, MapPin, User } from "lucide-react";
import Footer from "../components/Footer";
import API_BASE_URL from "../services/api";

function Tracking() {
  const [trackingId, setTrackingId] = useState("");
  const [searched, setSearched] = useState(false);
  const [towData, setTowData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();

    const id = trackingId.trim().toUpperCase();

    if (!id) {
      setError("Please enter your tracking ID.");
      setSearched(false);
      setTowData(null);
      return;
    }

    setLoading(true);
    setError("");
    setSearched(false);
    setTowData(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/tow/track/${encodeURIComponent(id)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to find this tow request."
        );
      }

      setTowData(data.request);
      setSearched(true);
    } catch (err) {
      setError(
        err.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatStatus = (status = "") =>
    status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <>
      <section className="overflow-hidden bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <p className="font-semibold uppercase tracking-widest text-blue-600">
              Tracking
            </p>

            <h1 className="mt-3 text-4xl font-bold text-slate-900">
              Track Your Tow Request
            </h1>

            <p className="mt-5 text-gray-600">
              Enter your tracking ID to view your request details
              and current status.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleTrack}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="mx-auto mb-12 flex max-w-xl flex-col gap-4 sm:flex-row"
          >
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter tracking ID (e.g. BIG23-7K4P9X)"
                value={trackingId}
                onChange={(e) => {
                  setTrackingId(e.target.value);
                  setError("");
                  setSearched(false);
                  setTowData(null);
                }}
                className={`w-full rounded-lg border px-5 py-4 outline-none transition focus:ring-2 ${
                  error
                    ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-300 focus:border-blue-600 focus:ring-blue-100"
                }`}
              />

              {error && (
                <p role="alert" className="mt-2 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.03 }}
              whileTap={{ scale: loading ? 1 : 0.97 }}
              className="h-[58px] shrink-0 whitespace-nowrap rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Searching..." : "Track Tow"}
            </motion.button>
          </motion.form>

          {loading && (
            <p className="mb-8 text-center text-gray-600" role="status">
              Looking up your tow request...
            </p>
          )}

          {searched && towData && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="grid gap-10 lg:grid-cols-3"
            >
              <motion.div
                id="map"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="flex h-[450px] items-center justify-center rounded-3xl bg-gray-200 lg:col-span-2"
              >
                <div className="max-w-sm px-6 text-center text-gray-600">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <MapPin size={50} className="mx-auto mb-4" />
                  </motion.div>

                  <h3 className="text-xl font-semibold text-gray-800">
                    Live Map Tracking
                  </h3>

                  <p className="mt-2">
                    Your request has been found. The driver's live
                    location will appear here once a driver and GPS
                    tracking are connected to your request.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="rounded-3xl bg-white p-8 shadow-lg"
              >
                <h2 className="mb-6 text-2xl font-bold">
                  Tow Details
                </h2>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Truck className="shrink-0 text-blue-600" />

                    <div>
                      <p className="text-sm text-gray-500">
                        Tracking ID
                      </p>
                      <p className="break-all font-semibold">
                        {towData.trackingId}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <User className="shrink-0 text-blue-600" />

                    <div>
                      <p className="text-sm text-gray-500">
                        Vehicle
                      </p>
                      <p className="font-semibold">
                        {[towData.vehicleType, towData.vehicleModel]
                          .filter(Boolean)
                          .join(" — ") || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <MapPin className="shrink-0 text-blue-600" />

                    <div>
                      <p className="text-sm text-gray-500">
                        Pickup Location
                      </p>
                      <p className="font-semibold">
                        {towData.location || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Clock className="shrink-0 text-blue-600" />

                    <div>
                      <p className="text-sm text-gray-500">
                        Issue Reported
                      </p>
                      <p className="font-semibold">
                        {towData.issue || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Clock className="shrink-0 text-blue-600" />

                    <div>
                      <p className="text-sm text-gray-500">
                        Request Status
                      </p>
                      <p className="font-semibold text-blue-600">
                        {formatStatus(towData.status)}
                      </p>
                    </div>
                  </div>
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
