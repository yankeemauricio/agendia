export const usersListResponseDTO = (users) => {
  const usersDTO = users.map((user) => {
    const { nome, email, idade, telefone } = user;
    return { nome, email, idade, telefone };
  });
  return usersDTO;
};

export const usersResponseDTO = (user) => {
  const { nome, email, idade, telefone } = user;
  return { nome, email, idade, telefone };
};
