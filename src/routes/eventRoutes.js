import { Router } from "express";
import {
  getEvents,
  getEventbyName,
  getEventById,
  createEvent,
  parcialUpdateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import {
  eventCreateValidationRules,
  eventUpdateValidationRules,
} from "../validators/eventValidator.js";
import validate from "../middlewares/validatorMiddleware.js";

const router = Router();

router.get("/", getEvents);
router.get("/search/:name", getEventbyName);
router.get("/:id", getEventById);
router.post("/", eventCreateValidationRules, validate, createEvent);
router.patch("/:id", eventUpdateValidationRules, validate, parcialUpdateEvent);
router.delete("/:id", deleteEvent);

export default router;
