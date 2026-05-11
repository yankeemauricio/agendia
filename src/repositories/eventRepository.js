import { db } from "../data/data.js";
import { randomUUID } from "node:crypto";
import Fuse from "fuse.js";
import { eventListResponseDTO, eventResponseDTO } from "../dtos/eventDTO.js";

export const getEventsRepository = async () => {
  db.read();
  const events = db.data.events;
  return eventListResponseDTO(events);
};

export const getEventByIdRepository = async (id) => {
  await db.read();
  const event = db.data.events.find((e) => e.id === id);
  return event ? eventResponseDTO(event) : null;
};

export const getEventByNameRepository = async (name) => {
  await db.read();

  const options = {
    keys: ["titulo"],
    //0.0 (perfeito) a 1.0 (completamente diferente)
    threshold: 0.2,
  };

  const fuse = new Fuse(db.data.events, options);
  const results = fuse.search(name);
  const events = results.map((result) => result.item);

  return eventListResponseDTO(events);
};

export const createEventRepository = async (eventData) => {
  await db.read();
  const newEvent = {
    id: randomUUID(),
    ...eventData,
  };
  db.data.events.push(newEvent);
  await db.write();
  return eventResponseDTO(newEvent);
};

export const parcialUpdateEventRepository = async (id, eventData) => {
  await db.read();
  const eventIndex = db.data.events.findIndex((e) => e.id === id);
  if (eventIndex === -1) {
    return null;
  }
  db.data.events[eventIndex] = { ...db.data.events[eventIndex], ...eventData };
  await db.write();
  return eventResponseDTO(db.data.events[eventIndex]);
};

export const deleteEventRepository = async (id) => {
  await db.read();
  const eventIndex = db.data.events.findIndex((e) => e.id === id);
  if (eventIndex === -1) {
    return null;
  }
  const deletedEvent = db.data.events.splice(eventIndex, 1)[0];
  await db.write();
  return eventResponseDTO(deletedEvent);
};
export const getNowCapacityRepository = async (eventId) => {
  await db.read();
  const event = db.data.events.find((e) => e.id === eventId);
  const capacity = event.vagas - event.participantes.length;
  return capacity;
};
