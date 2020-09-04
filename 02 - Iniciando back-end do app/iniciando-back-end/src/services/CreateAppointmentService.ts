import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import { getCustomRepository } from 'typeorm';
import { startOfHour } from "date-fns";


interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {

  public async execute({ date, provider }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentRepository);

    const apppointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(apppointmentDate);

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({ provider, date: apppointmentDate });
    await appointmentsRepository.save(appointment);


    return appointment;
  }
}

export default CreateAppointmentService;