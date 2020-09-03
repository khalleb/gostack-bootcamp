import { Router } from "express";
import { parseISO } from "date-fns";
import AppointmentRepository from "../repositories/AppointmentsRepository";

const appointmentRouter = Router();
const appointmentRepository = new AppointmentRepository();
import CreateAppointmentService from '../services/CreateAppointmentService';

appointmentRouter.get('/', (request, response) => {
  const appointments = appointmentRepository.all();
  return response.json(appointments);
})


appointmentRouter.post("/", (request, response) => {
  try {
    const { provider, date } = request.body;

    const parseDate = parseISO(date)

    const createAppointment = new CreateAppointmentService(appointmentRepository);

    const appointment = createAppointment.execute({ date: parseDate, provider });
    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentRouter;
