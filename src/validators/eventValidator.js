import { body } from "express-validator";
import validate from "../middlewares/validatorMiddleware.js";

const eventValidationRules = [
  body("titulo").notEmpty().withMessage("O título é obrigatório"),
  body("descricao").optional(),
  body("data")
    .notEmpty()
    .withMessage("A data é obrigatória")
    .isLength({ min: 10, max: 10 })
    .withMessage("A data deve estar no formato DD-MM-YYYY"),
  body("horario")
    .notEmpty()
    .withMessage("O horário é obrigatório")
    .isLength({ min: 5, max: 5 })
    .withMessage("O horário deve estar no formato HH:mm"),
  body("local").notEmpty().withMessage("O local é obrigatório"),
  body("participantes")
    .isArray()
    .withMessage("Os participantes devem ser um array de strings"),
  body("acesso")
    .notEmpty()
    .withMessage("O acesso é obrigatório")
    .isIn(["Público", "Privado", "Restrito"])
    .withMessage("O acesso deve ser 'Público', 'Privado' ou 'Restrito'"),

  validate,
];

export default eventValidationRules;
