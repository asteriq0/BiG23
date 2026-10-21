
import mongoose from "mongoose";

const towRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    vehicleType: {
      type: String,
      required: true,
      trim: true,
    },

    vehicleModel: {
      type: String,
      required: true,
      trim: true,
    },

    issue: {
      type: String,
      required: true,
      trim: true,
    },

    trackingId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "assigned",
        "in-progress",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    // Driver assignment details
    driverName: {
      type: String,
      trim: true,
      default: "",
    },

    driverPhone: {
      type: String,
      trim: true,
      default: "",
    },

    truck: {
      type: String,
      trim: true,
      default: "",
    },

    estimatedArrival: {
      type: Number,
      min: 0,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const TowRequest = mongoose.model(
  "TowRequest",
  towRequestSchema
);

export default TowRequest;
