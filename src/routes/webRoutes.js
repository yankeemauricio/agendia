import express from "express";
import {
  getEventsWeb,
  getEventDetailsWeb,
  getMyEventsWeb,
  loginPage,
  registerPage,
  createEventPage,
  adminEventsPage,
  editEventPage,
} from "../controllers/webController.js";
import { loginMiddleware } from "../middlewares/loginMiddleware.js";
import { checkRole } from "../middlewares/permissionMiddleware.js";

const router = express.Router();
router.get("/", loginMiddleware, getEventsWeb);
router.get("/event/:search", loginMiddleware, getEventsWeb);
router.get("/events/:id", loginMiddleware, getEventDetailsWeb);
router.get("/meus-eventos", loginMiddleware, getMyEventsWeb);
router.get("/login", loginPage);
router.get("/cadastro", registerPage);
///admin
router.get(
  "/admin/criar-evento",
  loginMiddleware,
  checkRole("admin"),
  createEventPage,
);
router.get(
  "/admin/eventos",
  loginMiddleware,
  checkRole("admin"),
  adminEventsPage,
);
router.get(
  "/admin/evento/:id",
  loginMiddleware,
  checkRole("admin"),
  editEventPage,
);

export default router;
