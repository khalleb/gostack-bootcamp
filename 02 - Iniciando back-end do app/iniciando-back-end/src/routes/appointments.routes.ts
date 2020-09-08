import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from "../repositories/AppointmentsRepository";
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentRouter = Router();
appointmentRouter.use(ensureAuthenticated);
import CreateAppointmentService from '../services/CreateAppointmentService';

appointmentRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
})


appointmentRouter.post("/", async (request, response) => {
  const { provider_id, date } = request.body;
  const parseDate = parseISO(date)

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({ date: parseDate, provider_id });
  return response.json(appointment);
});

export default appointmentRouter;
