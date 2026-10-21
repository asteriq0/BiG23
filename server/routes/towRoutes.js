import express from "express";
import { createTowRequest, getTowRequestByTrackingId, assignDriver, updateTowStatus, getAllTowRequests, deleteTowRequest, deleteAllTowRequests, deleteSelectedTowRequests } from "../controllers/towController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Public routes
//1. This is to create a tow request
router.post("/request", createTowRequest);

//2. this is to find a tow request by tracking ID
router.get("/track/:trackingId", getTowRequestByTrackingId);

// Protected admin routes
//1. This is to get all tow requests
router.get("/admin/requests", adminAuth, getAllTowRequests);

//2. This is to assign a driver to a tow request
router.patch("/:trackingId/assign-driver", adminAuth, assignDriver);

//3. This is to update a tow request's status
router.patch("/:trackingId/status", adminAuth, updateTowStatus);

//4. This is to delete selected tow requests
router.delete("/admin/requests/selected", adminAuth, deleteSelectedTowRequests);

//5. This is to delete tow requests
router.delete("/admin/requests", adminAuth, deleteAllTowRequests);

//6. This is to delete tow requests
router.delete("/:trackingId", adminAuth, deleteTowRequest);

export default router;