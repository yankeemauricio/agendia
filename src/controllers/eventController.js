import {
  getEventsService,
  getEventByNameService,
  getEventByIdService,
  createEventService,
  parcialUpdateEventService,
  deleteEventService,
} from "../services/eventService.js";

export const getEvents = async (req, res, next) => {
  try {
    const events = await getEventsService();
    res.json(events);
  } catch (error) {
    next(error);
  }
};

export const getEventbyName = async (req, res, next) => {
  try {
    const name = req.params.name;
    const event = await getEventByNameService(name);
    res.json(event);
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const event = await getEventByIdService(id);
    res.json(event);
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const eventData = req.body;
    const event = await createEventService(eventData);
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

export const parcialUpdateEvent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const eventData = req.body;
    const event = await parcialUpdateEventService(id, eventData);
    res.json(event);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteEventService(id);
    res.json({ message: "Evento removido com sucesso" });
  } catch (error) {
    next(error);
  }
};
