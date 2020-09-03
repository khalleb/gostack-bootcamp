import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from "date-fns";


interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor(appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const apppointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentRepository.findByDate(apppointmentDate);

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentRepository.create({ provider, date: apppointmentDate });

    return appointment;
  }
}

export default CreateAppointmentService;