import { db } from "../data/data.js";
import { randomUUID } from "node:crypto";
import Fuse from "fuse.js";
import {
  participantsListResponseDTO,
  participantResponseDTO,
} from "../dtos/participantDTO.js";

export const getParticipantsRepository = async (eventId) => {
  db.read();
  const event = db.data.events.find((p) => p.id === eventId);
  const participants = event.participantes;
  return participantsListResponseDTO(participants);
};

export const getParticipantByNameRepository = async (eventId, name) => {
  await db.read();
  const event = db.data.events.find((p) => p.id === eventId);

  const options = {
    keys: ["nome"],
    //0.0 (perfeito) a 1.0 (completamente diferente)
    threshold: 0.0,
  };

  const fuse = new Fuse(event.participantes, options);
  const results = fuse.search(name);
  const participants = results.map((result) => result.item);

  return participantsListResponseDTO(participants);
};

export const registerParticipantRepository = async (
  eventId,
  participantData,
) => {
  await db.read();
  const event = db.data.events.find((p) => p.id === eventId);
  if (!event) {
    return null;
  }
  const newParticipant = {
    id: randomUUID(),
    ...participantData,
  };
  event.participantes.push(newParticipant);
  await db.write();
  return participantResponseDTO(newParticipant);
};

export const parcialUpdateParticipantRepository = async (
  eventId,
  participantId,
  eventData,
) => {
  await db.read();
  const event = db.data.events.find((p) => p.id === eventId);
  if (!event) {
    return null;
  }
  const participantIndex = event.participantes.findIndex(
    (p) => p.id === participantId,
  );
  if (participantIndex === -1) {
    return null;
  }
  event.participantes[participantIndex] = {
    ...event.participantes[participantIndex],
    ...eventData,
  };
  await db.write();
  return participantResponseDTO(event.participantes[participantIndex]);
};

export const deleteParticipantRepository = async (eventId, participantId) => {
  await db.read();
  const event = db.data.events.find((p) => p.id === eventId);
  if (!event) {
    return null;
  }
  const participantIndex = event.participantes.findIndex(
    (p) => p.id === participantId,
  );
  if (participantIndex === -1) {
    return null;
  }
  const deletedParticipant = event.participantes.splice(participantIndex, 1)[0];
  await db.write();
  return participantResponseDTO(deletedParticipant);
};
