import {
  getEventsRepository,
  getEventByIdRepository,
  getEventByNameRepository,
} from "../repositories/eventRepository.js";
import { registerParticipantService } from "../services/participantService.js";

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

export const registerParticipantWeb = async (req, res) => {
  const { id } = req.params;

  const participantData = {
    nome: req.body.nome,
    email: req.body.email,
    telefone: req.body.telefone,
    cpf: req.body.cpf,
    dataNascimento: req.body.dataNascimento,
  };

  try {
    await registerParticipantService(id, participantData);
    res.redirect(`/events/${id}?success=true`);
  } catch (error) {
    const event = await getEventByIdRepository(id);
    res.render("details", {
      event,
      error: error.message,
    });
  }
};
