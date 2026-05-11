import { Router } from "express";
import {
  getParticipants,
  getParticipantByName,
  registerParticipant,
  partialUpdateParticipant,
  deleteParticipant,
} from "../controllers/participantController.js";
import {
  registerParticipantValidationRules,
  partialUpdateParticipantValidationRules,
} from "../validators/participantValidator.js";
import validate from "../middlewares/validatorMiddleware.js";

const router = Router();

router.get("/:eventId", getParticipants);
router.get("/search/:eventId/:name", getParticipantByName);
router.post(
  "/:eventId",
  registerParticipantValidationRules,
  validate,
  registerParticipant,
);
router.patch(
  "/:eventId/:participantId",
  partialUpdateParticipantValidationRules,
  validate,
  partialUpdateParticipant,
);
router.delete("/:eventId/:participantId", deleteParticipant);

export default router;
