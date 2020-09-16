import Appointment from '../infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { startOfHour } from "date-fns";


interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {

  constructor(@inject('AppointmentsRepository') private appointmentsRepository: IAppointmentsRepository) { }

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {

    const apppointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(apppointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({ provider_id, date: apppointmentDate });
    return appointment;
  }
}

export default CreateAppointmentService;