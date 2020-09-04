import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from "../repositories/AppointmentsRepository";

const appointmentRouter = Router();
import CreateAppointmentService from '../services/CreateAppointmentService';

appointmentRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
})


appointmentRouter.post("/", async (request, response) => {
  try {
    const { provider, date } = request.body;
    const parseDate = parseISO(date)

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({ date: parseDate, provider });
    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentRouter;
