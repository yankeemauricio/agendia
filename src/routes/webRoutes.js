import express from "express";
import {
  getEventsWeb,
  getEventDetailsWeb,
  registerParticipantWeb,
} from "../controllers/webController.js";

const router = express.Router();
router.get("/", getEventsWeb);
router.get("/:search", getEventsWeb);
router.get("/events/:id", getEventDetailsWeb);
router.post("/events/:id/register", registerParticipantWeb);

export default router;
