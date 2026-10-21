import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  RefreshCw,
  Truck,
  Clock,
  MapPin,
  UserPlus,
} from "lucide-react";
import API_BASE_URL from "../services/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState("");
  const [success, setSuccess] = useState("");
  const [driverForms, setDriverForms] = useState({});
  const [statusForms, setStatusForms] = useState({});
  const [selectedRequests, setSelectedRequests] = useState([]);

  const fetchRequests = async () => {
    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin");
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/api/tow/admin/requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        sessionStorage.removeItem("adminToken");
        navigate("/admin");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to load requests.");
      }

      const fetchedRequests = Array.isArray(data)
        ? data
        : data.requests || [];

      setRequests(fetchedRequests);
    } catch (err) {
      setError(err.message || "Unable to load tow requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const updateDriverForm = (trackingId, field, value) => {
    setDriverForms((previous) => ({
      ...previous,
      [trackingId]: {
        ...previous[trackingId],
        [field]: value,
      },
    }));
  };

  const assignDriver = async (e, request) => {
    e.preventDefault();

    const trackingId = request.trackingId;
    const token = sessionStorage.getItem("adminToken");
    const form = driverForms[trackingId] || {};

    if (!token) {
      navigate("/admin");
      return;
    }

    if (
      !form.driverName?.trim() ||
      !form.driverPhone?.trim() ||
      !form.truck?.trim() ||
      form.estimatedArrival === undefined ||
      form.estimatedArrival === ""
    ) {
      setError("Please fill in all driver assignment fields.");
      return;
    }

    if (
      !Number.isFinite(Number(form.estimatedArrival)) ||
      Number(form.estimatedArrival) < 0
    ) {
      setError("Estimated arrival must be a valid number of minutes.");
      return;
    }

    setSavingId(trackingId);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/tow/${encodeURIComponent(
          trackingId
        )}/assign-driver`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            driverName: form.driverName.trim(),
            driverPhone: form.driverPhone.trim(),
            truck: form.truck.trim(),
            estimatedArrival: Number(form.estimatedArrival),
          }),
        }
      );

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        sessionStorage.removeItem("adminToken");
        navigate("/admin");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to assign driver.");
      }

      setSuccess(`Driver assigned successfully to ${trackingId}.`);

      setDriverForms((previous) => ({
        ...previous,
        [trackingId]: {
          driverName: "",
          driverPhone: "",
          truck: "",
          estimatedArrival: "",
        },
      }));

      await fetchRequests();
    } catch (err) {
      setError(err.message || "Unable to assign driver.");
    } finally {
      setSavingId("");
    }
  };

  const updateRequestStatus = async (request, newStatus) => {
    const trackingId = request.trackingId;
    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin");
      return;
    }

    if (["completed", "cancelled"].includes(request.status)) {
      setError("Completed or cancelled requests cannot be updated.");
      return;
    }

    if (
      ["assigned", "in-progress"].includes(newStatus) &&
      !request.driverName
    ) {
      setError("Assign a driver before updating to this status.");
      return;
    }

    setSavingId(trackingId);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/tow/${encodeURIComponent(
          trackingId
        )}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        sessionStorage.removeItem("adminToken");
        navigate("/admin");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to update request status.");
      }

      setStatusForms((previous) => ({
        ...previous,
        [trackingId]: newStatus,
      }));

      setSuccess(
        `Request ${trackingId} status updated to ${formatStatus(newStatus)}.`
      );

      await fetchRequests();
    } catch (err) {
      setError(err.message || "Unable to update request status.");
    } finally {
      setSavingId("");
    }
  };

  const deleteRequest = async (request) => {
  const trackingId = request.trackingId;
  const token = sessionStorage.getItem("adminToken");

  if (!token) {
    navigate("/admin");
    return;
  }

  const confirmed = window.confirm(
    `Are you sure you want to permanently delete request ${trackingId}? This action cannot be undone.`
  );

  if (!confirmed) return;

  setSavingId(trackingId);
  setError("");
  setSuccess("");

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/tow/${encodeURIComponent(trackingId)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.status === 401 || response.status === 403) {
      sessionStorage.removeItem("adminToken");
      navigate("/admin");
      return;
    }

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete request.");
    }

    setRequests((previous) =>
      previous.filter((item) => item.trackingId !== trackingId)
    );

    setDriverForms((previous) => {
      const updated = { ...previous };
      delete updated[trackingId];
      return updated;
    });

    setStatusForms((previous) => {
      const updated = { ...previous };
      delete updated[trackingId];
      return updated;
    });

    setSuccess(`Request ${trackingId} was deleted successfully.`);
  } catch (err) {
    setError(err.message || "Unable to delete request.");
  } finally {
    setSavingId("");
  }
};


const deleteAllRequests = async () => {
  const token = sessionStorage.getItem("adminToken");

  if (!token) {
    navigate("/admin");
    return;
  }

  if (requests.length === 0) {
    setError("There are no requests to delete.");
    return;
  }

  const confirmed = window.confirm(
    `WARNING: You are about to permanently delete ALL ${requests.length} tow requests. This cannot be undone. Are you sure?`
  );

  if (!confirmed) return;

  setSavingId("delete-all");
  setError("");
  setSuccess("");

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/tow/admin/requests`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.status === 401 || response.status === 403) {
      sessionStorage.removeItem("adminToken");
      navigate("/admin");
      return;
    }

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete all requests.");
    }

    setRequests([]);
    setDriverForms({});
    setStatusForms({});

    setSuccess(
      `All requests deleted successfully. ${data.deletedCount ?? requests.length} request(s) removed.`
    );
  } catch (err) {
    setError(err.message || "Unable to delete all requests.");
  } finally {
    setSavingId("");
  }
};

const deleteSelectedRequests = async () => {
  const token = sessionStorage.getItem("adminToken");

  if (!token) {
    navigate("/admin");
    return;
  }

  if (selectedRequests.length === 0) {
    setError("Please select at least one request to delete.");
    return;
  }

  const confirmed = window.confirm(
    `Are you sure you want to permanently delete ${selectedRequests.length} selected request(s)? This cannot be undone.`
  );

  if (!confirmed) return;

  setSavingId("delete-selected");
  setError("");
  setSuccess("");

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/tow/admin/requests/selected`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          trackingIds: selectedRequests,
        }),
      }
    );

    const data = await response.json();

    if (response.status === 401 || response.status === 403) {
      sessionStorage.removeItem("adminToken");
      navigate("/admin");
      return;
    }

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to delete selected requests."
      );
    }

    const deletedIds = new Set(selectedRequests);

    setRequests((previous) =>
      previous.filter(
        (request) => !deletedIds.has(request.trackingId)
      )
    );

    setDriverForms((previous) => {
      const updated = { ...previous };
      deletedIds.forEach((id) => delete updated[id]);
      return updated;
    });

    setStatusForms((previous) => {
      const updated = { ...previous };
      deletedIds.forEach((id) => delete updated[id]);
      return updated;
    });

    setSelectedRequests([]);

    setSuccess(
      `${data.deletedCount ?? deletedIds.size} selected request(s) deleted successfully.`
    );
  } catch (err) {
    setError(err.message || "Unable to delete selected requests.");
  } finally {
    setSavingId("");
  }
};

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }

    return parsedDate.toLocaleString();
  };

  const formatStatus = (status) => {
    if (!status) return "Pending";

    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-300";
      case "assigned":
        return "bg-blue-500/20 text-blue-300";
      case "in-progress":
        return "bg-purple-500/20 text-purple-300";
      case "completed":
        return "bg-green-500/20 text-green-300";
      case "cancelled":
        return "bg-red-500/20 text-red-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  const pendingCount = requests.filter(
    (request) => request.status === "pending"
  ).length;

  const activeCount = requests.filter((request) =>
    ["assigned", "in-progress"].includes(request.status)
  ).length;

  const completedCount = requests.filter(
    (request) => request.status === "completed"
  ).length;

  const inputClass =
    "w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-blue-500";

  const buttonClass =
    "inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-blue-400">
              BiG23 Administration
            </p>
            <h1 className="text-3xl font-bold sm:text-4xl">
              Tow Requests Dashboard
            </h1>
            <p className="mt-2 text-gray-400">
              Manage requests, assign drivers, and update request statuses.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={fetchRequests}
              disabled={loading || Boolean(savingId)}
              className={buttonClass}
            >
              <RefreshCw size={18} />
              Refresh
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-700 px-4 py-2 font-semibold text-gray-200 transition hover:bg-gray-800"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </header>

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-green-300"
          >
            {success}
          </div>
        )}

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
            <p className="text-sm text-gray-400">Total Requests</p>
            <p className="mt-2 text-3xl font-bold">{requests.length}</p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
            <p className="text-sm text-gray-400">Pending</p>
            <p className="mt-2 text-3xl font-bold text-yellow-300">
              {pendingCount}
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
            <p className="text-sm text-gray-400">Active Requests</p>
            <p className="mt-2 text-3xl font-bold text-blue-300">
              {activeCount}
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
            <p className="text-sm text-gray-400">Completed</p>
            <p className="mt-2 text-3xl font-bold text-green-300">
              {completedCount}
            </p>
          </div>
        </div>

        
<div className="mb-5 space-y-4">
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h2 className="text-2xl font-bold">All Tow Requests</h2>
      <span className="text-sm text-gray-400">
        {requests.length} request
        {requests.length === 1 ? "" : "s"}
      </span>
    </div>

    <button
      type="button"
      onClick={deleteAllRequests}
      disabled={Boolean(savingId) || requests.length === 0}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {savingId === "delete-all"
        ? "Deleting All..."
        : "Delete All Requests"}
    </button>
  </div>

  {requests.length > 0 && (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-800 bg-gray-900 p-4 sm:flex-row sm:items-center sm:justify-between">
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={
            requests.length > 0 &&
            requests.every((request) =>
              selectedRequests.includes(request.trackingId)
            )
          }
          onChange={(e) => {
            setSelectedRequests(
              e.target.checked
                ? requests.map((request) => request.trackingId)
                : []
            );
          }}
          disabled={Boolean(savingId)}
          className="h-5 w-5 accent-blue-500"
        />

        <span className="text-sm font-medium">
          Select All Requests
        </span>
      </label>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={deleteSelectedRequests}
          disabled={
            Boolean(savingId) || selectedRequests.length === 0
          }
          className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {savingId === "delete-selected"
            ? "Deleting Selected..."
            : `Delete Selected (${selectedRequests.length})`}
        </button>

        <button
          type="button"
          onClick={() => setSelectedRequests([])}
          disabled={Boolean(savingId) || selectedRequests.length === 0}
          className="rounded-lg border border-gray-700 px-4 py-2 font-semibold text-gray-200 transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear Selection
        </button>
      </div>
    </div>
  )}
</div>

        {loading ? (
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-10 text-center text-gray-400">
            Loading tow requests...
          </div>
        ) : requests.length === 0 ? (
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-10 text-center text-gray-400">
            No tow requests found.
          </div>
        ) : (
          <div className="space-y-6">
            {requests.map((request) => {
              const trackingId = request.trackingId;
              const isTerminal = ["completed", "cancelled"].includes(
                request.status
              );

              const selectedStatus =
                statusForms[trackingId] ?? request.status ?? "pending";

              const availableStatuses = Array.from(
                new Set([
                  request.status || "pending",
                  ...(request.driverName
                    ? [
                        "assigned",
                        "in-progress",
                        "completed",
                        "cancelled",
                      ]
                    : ["pending", "cancelled"]),
                ])
              );

              const driverForm = driverForms[trackingId] || {};

              return (
  <article
    key={request._id || trackingId}
    className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900"
  >
    <div className="flex items-center gap-3 border-b border-gray-800 p-4">
      <input
        type="checkbox"
        checked={selectedRequests.includes(trackingId)}
        onChange={(e) => {
          setSelectedRequests((previous) =>
            e.target.checked
              ? [...new Set([...previous, trackingId])]
              : previous.filter((id) => id !== trackingId)
          );
        }}
        disabled={Boolean(savingId)}
        aria-label={`Select request ${trackingId}`}
        className="h-5 w-5 accent-blue-500"
      />

      <span className="text-sm text-gray-400">
        Select this request
      </span>
    </div>

    <div className="flex flex-col gap-4 border-b border-gray-800 p-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Tracking ID</p>
                      <h3 className="mt-1 break-all text-xl font-bold text-blue-300">
                        {trackingId || "Not available"}
                      </h3>
                      <p className="mt-2 text-sm text-gray-400">
                        Submitted: {formatDate(request.createdAt)}
                      </p>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${statusColor(
                        request.status
                      )}`}
                    >
                      {formatStatus(request.status)}
                    </span>
                  </div>

                  <div className="grid gap-6 p-5 lg:grid-cols-2">
                    <section>
                      <h4 className="mb-4 flex items-center gap-2 font-semibold">
                        <Truck size={18} className="text-blue-400" />
                        Request Details
                      </h4>

                      <div className="space-y-3 text-sm">
                        <p>
                          <span className="text-gray-400">Customer:</span>{" "}
                          {request.name || "Not provided"}
                        </p>

                        <p>
                          <span className="text-gray-400">Phone:</span>{" "}
                          {request.phone || "Not provided"}
                        </p>

                        <p className="flex items-start gap-2">
                          <MapPin
                            size={17}
                            className="mt-0.5 shrink-0 text-gray-400"
                          />
                          <span>
                            <span className="text-gray-400">Location:</span>{" "}
                            {request.location || "Not provided"}
                          </span>
                        </p>

                        {request.destination && (
                          <p>
                            <span className="text-gray-400">Destination:</span>{" "}
                            {request.destination}
                          </p>
                        )}

                        <p>
                          <span className="text-gray-400">Vehicle:</span>{" "}
                          {[request.vehicleType, request.vehicleModel]
                            .filter(Boolean)
                            .join(" ") || "Not provided"}
                        </p>

                        {request.serviceType && (
                          <p>
                            <span className="text-gray-400">Service:</span>{" "}
                            {request.serviceType}
                          </p>
                        )}

                        {request.issue && (
                          <p>
                            <span className="text-gray-400">Issue:</span>{" "}
                            {request.issue}
                          </p>
                        )}
                      </div>
                    </section>

                    <section>
                      <h4 className="mb-4 flex items-center gap-2 font-semibold">
                        <Clock size={18} className="text-blue-400" />
                        Driver Information
                      </h4>

                      {request.driverName ? (
                        <div className="space-y-3 rounded-lg border border-gray-800 bg-gray-950 p-4 text-sm">
                          <p>
                            <span className="text-gray-400">Driver:</span>{" "}
                            {request.driverName}
                          </p>
                          <p>
                            <span className="text-gray-400">
                              Driver Phone:
                            </span>{" "}
                            {request.driverPhone || "Not provided"}
                          </p>
                          <p>
                            <span className="text-gray-400">Truck:</span>{" "}
                            {request.truck || "Not provided"}
                          </p>
                          <p>
                            <span className="text-gray-400">
                              Estimated Arrival:
                            </span>{" "}
                            {request.estimatedArrival ?? "Not provided"}
                            {request.estimatedArrival !== undefined &&
                            request.estimatedArrival !== null
                              ? " minutes"
                              : ""}
                          </p>
                        </div>
                      ) : (
                        <p className="rounded-lg border border-dashed border-gray-700 p-4 text-sm text-gray-400">
                          No driver has been assigned yet.
                        </p>
                      )}
                    </section>
                  </div>

                  {!isTerminal && (
                    <div className="grid gap-6 border-t border-gray-800 p-5 lg:grid-cols-2">
                      <section>
                        <h4 className="mb-4 flex items-center gap-2 font-semibold">
                          <RefreshCw size={18} className="text-blue-400" />
                          Manage Request Status
                        </h4>

                        <label
                          htmlFor={`status-${trackingId}`}
                          className="mb-2 block text-sm text-gray-400"
                        >
                          Select a status
                        </label>

                        <select
                          id={`status-${trackingId}`}
                          value={selectedStatus}
                          onChange={(e) =>
                            setStatusForms((previous) => ({
                              ...previous,
                              [trackingId]: e.target.value,
                            }))
                          }
                          disabled={Boolean(savingId)}
                          className={`${inputClass} mb-3`}
                        >
                          {availableStatuses.map((status) => (
                            <option key={status} value={status}>
                              {formatStatus(status)}
                            </option>
                          ))}
                        </select>

                        <button
                          type="button"
                          onClick={() =>
                            updateRequestStatus(request, selectedStatus)
                          }
                          disabled={
                            Boolean(savingId) ||
                            selectedStatus === request.status
                          }
                          className={buttonClass}
                        >
                          {savingId === trackingId
                            ? "Updating..."
                            : "Update Status"}
                        </button>
                      </section>

                      <section>
                        <h4 className="mb-4 flex items-center gap-2 font-semibold">
                          <UserPlus size={18} className="text-blue-400" />
                          Assign Driver
                        </h4>

                        <form
                          onSubmit={(e) => assignDriver(e, request)}
                          className="space-y-3"
                        >
                          <input
                            type="text"
                            placeholder="Driver name"
                            value={driverForm.driverName || ""}
                            onChange={(e) =>
                              updateDriverForm(
                                trackingId,
                                "driverName",
                                e.target.value
                              )
                            }
                            className={inputClass}
                            required
                          />

                          <input
                            type="tel"
                            placeholder="Driver phone number"
                            value={driverForm.driverPhone || ""}
                            onChange={(e) =>
                              updateDriverForm(
                                trackingId,
                                "driverPhone",
                                e.target.value
                              )
                            }
                            className={inputClass}
                            required
                          />

                          <input
                            type="text"
                            placeholder="Truck / towing vehicle"
                            value={driverForm.truck || ""}
                            onChange={(e) =>
                              updateDriverForm(
                                trackingId,
                                "truck",
                                e.target.value
                              )
                            }
                            className={inputClass}
                            required
                          />

                          <input
                            type="number"
                            min="0"
                            step="1"
                            placeholder="Estimated arrival (minutes)"
                            value={driverForm.estimatedArrival ?? ""}
                            onChange={(e) =>
                              updateDriverForm(
                                trackingId,
                                "estimatedArrival",
                                e.target.value
                              )
                            }
                            className={inputClass}
                            required
                          />

                          <button
                            type="submit"
                            disabled={Boolean(savingId)}
                            className={buttonClass}
                          >
                            {savingId === trackingId
                              ? "Saving..."
                              : request.driverName
                              ? "Update Driver Assignment"
                              : "Assign Driver"}
                          </button>
                        </form>
                      </section>
                    </div>
                  )}

                  {isTerminal && (
  <div className="border-t border-gray-800 p-5 text-sm text-gray-400">
    This request is {formatStatus(request.status).toLowerCase()}.
    Status updates and driver assignment are disabled.
  </div>
)}

<div className="border-t border-gray-800 p-5 flex justify-end">
  <button
    type="button"
    onClick={() => deleteRequest(request)}
    disabled={Boolean(savingId)}
    className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {savingId === request.trackingId
      ? "Deleting..."
      : "Delete Request"}
  </button>
</div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;