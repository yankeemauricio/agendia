//import { events } from "../data/eventData.js";
import EventModel from "../models/event.model.js";

// Ver todos os eventos
export const getEvents = async (req, res) => {
  try {
    const events = await EventModel.find();
    res.json(events);
  } catch (error) {
    console.error("Erro ao buscar eventos:", error.message);
    return res.status(500).json({ message: "Erro ao buscar eventos" });
  }
};

// Ver um evento específico por ID
export const getEventById = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await EventModel.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }
    res.json(event);
  } catch (error) {
    console.error("Erro ao buscar evento:", error.message);
    return res.status(500).json({ message: "Erro ao buscar evento" });
  }
};

// Criar um novo evento
export const createEvent = async (req, res) => {
  try {
    const event = await EventModel.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    console.error("Erro ao criar evento:", error.message);
    return res.status(500).json({ message: "Erro ao criar evento" });
  }
};

// Atualizar um evento existente
export const updateEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await EventModel.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }
    const { titulo, descricao, local, data, horario, participantes, acesso } =
      req.body;
    if (titulo) event.titulo = titulo;
    if (descricao) event.descricao = descricao;
    if (local) event.local = local;
    if (data) event.data = data;
    if (horario) event.horario = horario;
    if (participantes) event.participantes = participantes;
    if (acesso) event.acesso = acesso;
    await event.save();
    res.json(event);
  } catch (error) {
    console.error("Erro ao atualizar evento:", error.message);
    return res.status(500).json({ message: "Erro ao atualizar evento" });
  }
};

// Deletar um evento
export const deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await EventModel.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }
    res.json({ message: "Evento removido com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar evento:", error.message);
    return res.status(500).json({ message: "Erro ao deletar evento" });
  }
};
