import { db } from "../data/data.js";
import { randomUUID } from "node:crypto";
import Fuse from "fuse.js";
import { usersListResponseDTO, usersResponseDTO } from "../dtos/usersDTO.js";

export const getUsersRepository = async () => {
  db.read();
  const users = db.data.users;
  return usersListResponseDTO(users);
};

export const getUserByIdRepository = async (id) => {
  await db.read();
  const user = db.data.users.find((u) => u.id === id);
  return user ? usersResponseDTO(user) : null;
};

export const getUserByNameRepository = async (name) => {
  await db.read();

  const options = {
    keys: ["nome"],
    //0.0 (perfeito) a 1.0 (completamente diferente)
    threshold: 0.2,
  };

  const fuse = new Fuse(db.data.users, options);
  const results = fuse.search(name);
  const users = results.map((result) => result.item);

  return usersListResponseDTO(users);
};

export const getUserByCpfRepository = async (cpf) => {
  await db.read();
  const user = db.data.users.find((u) => u.cpf === cpf);
  return user ? usersResponseDTO(user) : null;
};

export const getUserByEmailRepository = async (email) => {
  await db.read();
  const user = db.data.users.find((u) => u.email === email);
  return user ? usersResponseDTO(user) : null;
};

export const registerUserRepository = async (userData) => {
  await db.read();
  const newUser = {
    id: randomUUID(),
    ...userData,
    eventos: [],
  };
  db.data.users.push(newUser);
  await db.write();
  return usersResponseDTO(newUser);
};

export const partialUpdateUserRepository = async (id, userData) => {
  await db.read();
  const userIndex = db.data.users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    return null;
  }
  db.data.users[userIndex] = { ...db.data.users[userIndex], ...userData };
  await db.write();
  return usersResponseDTO(db.data.users[userIndex]);
};

export const deleteUserRepository = async (id) => {
  await db.read();
  const userIndex = db.data.users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    return null;
  }
  const deletedUser = db.data.users.splice(userIndex, 1)[0];
  await db.write();
  return usersResponseDTO(deletedUser);
};
