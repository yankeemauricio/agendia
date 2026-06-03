import {
  getEventsRepository,
  getEventByIdRepository,
  getEventByNameRepository,
} from "../repositories/eventRepository.js";
import { getMyEventsRepository } from "../repositories/participantRepository.js";
import { db } from "../data/data.js";

export const getEventsWeb = async (req, res) => {
  try {
    const { search } = req.params;
    let events;

    if (search) {
      // Usa o repositório de busca por nome se houver uma query 'search'
      events = await getEventByNameRepository(search);
    } else {
      // Caso contrário, lista todos
      events = await getEventsRepository();
    }

    res.render("index", { events, searchTerm: search });
  } catch (error) {
    res.status(500).send("Erro ao carregar o Agendia: " + error.message);
  }
};

export const getMyEventsWeb = async (req, res) => {
  try {
    const userId = req.userId;
    const events = await getMyEventsRepository(userId);
    res.render("meus-eventos", { userEvents: events });
  } catch (error) {
    res.status(500).send("Erro ao carregar seus eventos: " + error.message);
  }
};

export const getEventDetailsWeb = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await getEventByIdRepository(id);

    if (!event) {
      return res
        .status(404)
        .render("error", { message: "Evento não encontrado" });
    }

    const success = req.query.success === "true";
    res.render("details", { event, success });
  } catch (error) {
    res.status(500).send("Erro no servidor: " + error.message);
  }
};

export const registerPage = (req, res) => {
  res.render("register", { error: null });
};

export const loginPage = (req, res) => {
  const error = req.query.error;
  res.render("login", { error });
};

export const userPage = (req, res) => {
  db.read();
  const user = db.data.users.find((u) => u.id === req.userId);
  res.render("perfil", { user });
};

export const createEventPage = (req, res) => {
  res.render("criar-evento", { event: null, error: null });
};

export const adminEventsPage = (req, res) => {
  db.read();
  const events = db.data.events;
  res.render("analisar-eventos", { events });
};

export const editEventPage = (req, res) => {
  db.read();
  const event = db.data.events.find((e) => e.id === req.params.id);
  if (!event) {
    return res
      .status(404)
      .render("error", { message: "Evento não encontrado" });
  }
  res.render("editar-evento", { event, error: null });
};
