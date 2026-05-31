import { db } from "../data/data.js";

// Função auxiliar para buscar o participante de forma segura
export const getParticipantRepository = async (eventId, participantId) => {
  await db.read();

  const event = db.data.events.find((e) => e.id === eventId);
  if (!event || !event.participantes) return null;

  const participant = event.participantes.find((p) => p === participantId);
  return participant || null;
};

// Registra o participante no evento E o evento no usuário
export const createParticipantRepository = async (eventId, participantId) => {
  await db.read();

  // 1. Localiza o evento e insere o participante
  const event = db.data.events.find((e) => e.id === eventId);
  if (!event) throw new Error("Evento não encontrado no banco");
  if (!event.participantes) event.participantes = [];
  // Evita duplicidade no array do evento se rodar em paralelo
  if (!event.participantes.includes(participantId)) {
    event.participantes.push(participantId);
  } else {
    throw new Error("Participação já registrada para este evento");
  }

  // 2. Localiza o usuário e insere o evento no vetor dele
  const user = db.data.users.find((u) => u.id === participantId);
  if (!user) throw new Error("Usuário não encontrado no banco");
  if (!user.eventos) user.eventos = []; // Garante que o vetor de eventos existe no user

  // Evita duplicidade no array do usuário
  if (!user.eventos.includes(eventId)) {
    user.eventos.push(eventId);
  }

  // Salva ambas as alterações de uma só vez
  await db.write();
  return event.participantes;
};

// Remove o participante do evento E o evento do usuário
export const deleteParticipantRepository = async (eventId, participantId) => {
  await db.read();

  // 1. Remove o participante da lista do evento
  const event = db.data.events.find((e) => e.id === eventId);
  if (event && event.participantes) {
    event.participantes = event.participantes.filter(
      (p) => p !== participantId,
    );
  }

  // 2. Remove o evento da lista do usuário
  const user = db.data.users.find((u) => u.id === participantId);
  if (user && user.eventos) {
    user.eventos = user.eventos.filter((eId) => eId !== eventId);
  }

  await db.write();
  return participantId;
};

export const getMyEventsRepository = async (participantId) => {
  await db.read();
  // 1. Localiza o usuário no banco
  const user = db.data.users.find((u) => u.id === participantId);

  // Se o usuário não existir ou não tiver nenhuma inscrição, retorna um array vazio
  if (!user || !user.eventos || user.eventos.length === 0) {
    return [];
  }

  // 2. Transforma o array de IDs [id1, id2] em um array de objetos de eventos completos
  const completEvents = user.eventos
    .map((eventId) => {
      // Procura o evento completo na lista global de eventos
      return db.data.events.find((e) => e.id === eventId);
    })
    .filter((event) => event !== undefined); // Remove possíveis eventos que foram deletados do banco global
  return completEvents;
};
