import {
  getEventsRepository,
  getEventByNameRepository,
  getEventByIdRepository,
  createEventRepository,
  parcialUpdateEventRepository,
  deleteEventRepository,
} from "../repositories/eventRepository.js";

export const getEventsService = async () => {
  const events = await getEventsRepository();
  return events;
};

export const getEventByNameService = async (name) => {
  const event = await getEventByNameRepository(name);
  if (!event) {
    throw new Error("Nenhum evento encontrado com o nome informado");
  }
  return event;
};

export const getEventByIdService = async (id) => {
  const event = await getEventByIdRepository(id);
  if (!event) {
    throw new Error("Nenhum evento encontrado com o ID informado");
  }
  return event;
};

export const createEventService = async (eventData) => {
  const newEvent = await createEventRepository(eventData);
  return newEvent;
};

export const parcialUpdateEventService = async (id, eventData) => {
  const event = await parcialUpdateEventRepository(id, eventData);
  if (!event) {
    throw new Error("Evento não encontrado");
  }
  return event;
};

export const deleteEventService = async (id) => {
  const event = await deleteEventRepository(id);
  if (!event) {
    throw new Error("Evento não encontrado");
  }
  return event;
};
