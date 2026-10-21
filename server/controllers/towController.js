import TowRequest from "../models/TowRequest.js";

const generateTrackingId = () => {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let id = "";

  for (let i = 0; i < 6; i++) {
    id += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return `BIG23-${id}`;
};


export const createTowRequest = async (req, res) => {
  try {
    const {
      name,
      phone,
      vehicleType,
      otherVehicleType,
      vehicleModel,
      location,
      issue,
    } = req.body;
    
    if (
      !name ||
      !phone ||
      !vehicleType ||
      !vehicleModel ||
      !location ||
      !issue
    ) {
      return res.status(400).json({
        message: "Please provide all required information.",
      });
    }
    
    if (vehicleType === "Others" && !otherVehicleType?.trim()) {
      return res.status(400).json({
        message: "Please specify your vehicle type.",
      });
    }
    
    const trackingId = generateTrackingId();
    
    const towRequest = await TowRequest.create({
      name,
      phone,
      vehicleType:
        vehicleType === "Others" ? otherVehicleType.trim() : vehicleType,
      vehicleModel,
      location,
      issue,
      trackingId,
    });

    res.status(201).json({
      message: "Tow request received successfully.",
      request: towRequest,
    });
  } catch (error) {
    console.error("Error creating tow request:", error);

    res.status(500).json({
      message: "Something went wrong while creating the tow request.",
    });
  }
};


export const getTowRequestByTrackingId = async (req, res) => {
  try {
    const { trackingId } = req.params;

    const towRequest = await TowRequest.findOne({
      trackingId: trackingId.trim().toUpperCase(),
    });

    if (!towRequest) {
      return res.status(404).json({
        message: "No tow request found with that tracking ID.",
      });
    }

    res.status(200).json({
      message: "Tow request found successfully.",
      request: {
  trackingId: towRequest.trackingId,
  location: towRequest.location,
  vehicleType: towRequest.vehicleType,
  vehicleModel: towRequest.vehicleModel,
  issue: towRequest.issue,
  status: towRequest.status,
  driverName: towRequest.driverName,
  truck: towRequest.truck,
  estimatedArrival: towRequest.estimatedArrival,
  createdAt: towRequest.createdAt,
  updatedAt: towRequest.updatedAt,
},
    });
  } catch (error) {
    console.error("Error finding tow request:", error);

    res.status(500).json({
      message: "Something went wrong while retrieving the tow request.",
    });
  }
};


export const assignDriver = async (req, res) => {
  try {
    const { trackingId } = req.params;
    const {
      driverName,
      driverPhone,
      truck,
      estimatedArrival,
    } = req.body;

    if (
      !driverName?.trim() ||
      !driverPhone?.trim() ||
      !truck?.trim()
    ) {
      return res.status(400).json({
        message:
          "Driver name, phone number, and truck are required.",
      });
    }

    if (
      estimatedArrival !== undefined &&
      estimatedArrival !== null &&
      (
        estimatedArrival === "" ||
        !Number.isFinite(Number(estimatedArrival)) ||
        Number(estimatedArrival) < 0
      )
    ) {
      return res.status(400).json({
        message:
          "Estimated arrival must be a valid non-negative number of minutes.",
      });
    }

    const towRequest = await TowRequest.findOne({
      trackingId: trackingId.trim().toUpperCase(),
    });

    if (!towRequest) {
      return res.status(404).json({
        message: "No tow request found with that tracking ID.",
      });
    }

    if (
      ["completed", "cancelled"].includes(towRequest.status)
    ) {
      return res.status(400).json({
        message:
          "A driver cannot be assigned to a completed or cancelled request.",
      });
    }

    towRequest.driverName = driverName.trim();
    towRequest.driverPhone = driverPhone.trim();
    towRequest.truck = truck.trim();

    if (
      estimatedArrival !== undefined &&
      estimatedArrival !== null &&
      estimatedArrival !== ""
    ) {
      towRequest.estimatedArrival = Number(estimatedArrival);
    }

    towRequest.status = "assigned";

    await towRequest.save();

    res.status(200).json({
      message: "Driver assigned successfully.",
      request: towRequest,
    });
  } catch (error) {
    console.error("Error assigning driver:", error);

    res.status(500).json({
      message: "Something went wrong while assigning the driver.",
    });
  }
};

export const updateTowStatus = async (req, res) => {
  try {
    const { trackingId } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "assigned",
      "in-progress",
      "completed",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Please provide a valid tow request status.",
      });
    }

    const towRequest = await TowRequest.findOne({
      trackingId: trackingId.trim().toUpperCase(),
    });

    if (!towRequest) {
      return res.status(404).json({
        message: "No tow request found with that tracking ID.",
      });
    }

    if (
      ["completed", "cancelled"].includes(towRequest.status)
    ) {
      return res.status(400).json({
        message:
          "Completed or cancelled requests cannot be updated.",
      });
    }

    if (
      status === "in-progress" &&
      !towRequest.driverName
    ) {
      return res.status(400).json({
        message:
          "Assign a driver before starting the tow request.",
      });
    }

    if (
      status === "assigned" &&
      !towRequest.driverName
    ) {
      return res.status(400).json({
        message:
          "Assign a driver before setting this status.",
      });
    }

    towRequest.status = status;

    await towRequest.save();

    res.status(200).json({
      message: "Tow request status updated successfully.",
      request: towRequest,
    });
  } catch (error) {
    console.error("Error updating tow request status:", error);

    res.status(500).json({
      message:
        "Something went wrong while updating the tow request status.",
    });
  }
};

export const getAllTowRequests = async (req, res) => {
  try {
    const requests = await TowRequest.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Tow requests retrieved successfully.",
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error("Error retrieving tow requests:", error);

    res.status(500).json({
      message: "Something went wrong while retrieving tow requests.",
    });
  }
};

export const deleteTowRequest = async (req, res) => {
  try {
    const { trackingId } = req.params;

    const request = await TowRequest.findOneAndDelete({
      trackingId: trackingId.trim().toUpperCase(),
    });

    if (!request) {
      return res.status(404).json({
        message: "No tow request found with that tracking ID.",
      });
    }

    res.status(200).json({
      message: "Tow request deleted successfully.",
      trackingId: request.trackingId,
    });
  } catch (error) {
    console.error("Error deleting tow request:", error);

    res.status(500).json({
      message: "Something went wrong while deleting the tow request.",
    });
  }
};

export const deleteAllTowRequests = async (req, res) => {
  try {
    const result = await TowRequest.deleteMany({});

    res.status(200).json({
      message: "All tow requests deleted successfully.",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting all tow requests:", error);

    res.status(500).json({
      message: "Something went wrong while deleting all tow requests.",
    });
  }
};

export const deleteSelectedTowRequests = async (req, res) => {
  try {
    const { trackingIds } = req.body;

    if (
      !Array.isArray(trackingIds) ||
      trackingIds.length === 0 ||
      trackingIds.some(
        (id) => typeof id !== "string" || !id.trim()
      )
    ) {
      return res.status(400).json({
        message: "Please select at least one valid tow request.",
      });
    }

    const normalizedIds = [
      ...new Set(
        trackingIds.map((id) => id.trim().toUpperCase())
      ),
    ];

    const result = await TowRequest.deleteMany({
      trackingId: { $in: normalizedIds },
    });

    res.status(200).json({
      message: "Selected tow requests deleted successfully.",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting selected tow requests:", error);

    res.status(500).json({
      message: "Something went wrong while deleting selected requests.",
    });
  }
};