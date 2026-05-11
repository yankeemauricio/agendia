import {
  getParticipantsRepository,
  getParticipantByNameRepository,
  registerParticipantRepository,
  parcialUpdateParticipantRepository,
  deleteParticipantRepository,
} from "../repositories/participantRepository.js";
import { getNowCapacityRepository } from "../repositories/eventRepository.js";

export const getParticipantsService = async (eventId) => {
  const participants = await getParticipantsRepository(eventId);
  return participants;
};

export const getParticipantByNameService = async (eventId, name) => {
  const participant = await getParticipantByNameRepository(eventId, name);
  if (!participant) {
    throw new Error("Nenhum participante encontrado com o nome informado");
  }
  return participant;
};

export const registerParticipantService = async (eventId, participantData) => {
  const capacity = await getNowCapacityRepository(eventId);
  if (capacity <= 0) {
    throw new Error("Não há vagas disponíveis para o evento");
  }
  const newParticipant = await registerParticipantRepository(
    eventId,
    participantData,
  );
  return newParticipant;
};

export const partialUpdateParticipantService = async (
  eventId,
  participantId,
  participantData,
) => {
  const participant = await parcialUpdateParticipantRepository(
    eventId,
    participantId,
    participantData,
  );
  if (!participant) {
    throw new Error("Participante não encontrado");
  }
  return participant;
};

export const deleteParticipantService = async (eventId, participantId) => {
  const participant = await deleteParticipantRepository(eventId, participantId);
  if (!participant) {
    throw new Error("Participante não encontrado");
  }
  return participant;
};
