import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: false,
  },
  local: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  horario: {
    type: String,
    required: true,
  },
  participantes: {
    type: [String],
    required: false,
  },
  acesso: {
    type: String,
    required: true,
  },
});

const EventModel = mongoose.model("Event", eventSchema);

export default EventModel;
