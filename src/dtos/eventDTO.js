export const eventListResponseDTO = (events) => {
  const eventsDTO = events.map((event) => {
    const { ...dadosEvent } = event;
    return dadosEvent;
  });
  return eventsDTO;
};

export const eventResponseDTO = (event) => {
  const { ...dadosEvent } = event;
  return dadosEvent;
};
