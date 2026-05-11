import {
  getParticipantsService,
  getParticipantByNameService,
  registerParticipantService,
  partialUpdateParticipantService,
  deleteParticipantService,
} from "../services/participantService.js";

export const getParticipants = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const participants = await getParticipantsService(eventId);
    res.json(participants);
  } catch (error) {
    next(error);
  }
};

export const getParticipantByName = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const name = req.params.name;
    const participant = await getParticipantByNameService(eventId, name);
    res.json(participant);
  } catch (error) {
    next(error);
  }
};

export const registerParticipant = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const participantData = req.body;
    const participant = await registerParticipantService(
      eventId,
      participantData,
    );
    res.status(201).json({
      message: "Participante registrado com sucesso!",
    });
  } catch (error) {
    next(error);
  }
};

export const partialUpdateParticipant = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const participantId = req.params.participantId;
    const participantData = req.body;
    const participant = await partialUpdateParticipantService(
      eventId,
      participantId,
      participantData,
    );
    res.json(participant);
  } catch (error) {
    next(error);
  }
};

export const deleteParticipant = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const participantId = req.params.participantId;
    await deleteParticipantService(eventId, participantId);
    res.json({ message: "Participante removido com sucesso" });
  } catch (error) {
    next(error);
  }
};
