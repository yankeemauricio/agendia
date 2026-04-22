import { Router } from "express";
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import eventValidationRules from "../validators/eventValidator.js";

const router = Router();

router.get("/", getEvents);
router.get("/event/:id", getEventById);
router.post("/event", eventValidationRules, createEvent);
router.patch("/event/:id", updateEvent);
router.delete("/event/:id", deleteEvent);

export default router;
