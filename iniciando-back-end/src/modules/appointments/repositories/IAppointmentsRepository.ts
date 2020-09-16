import Appointment from '../infra/typeorm/entities/Appointment';
import Appointments from '../infra/typeorm/entities/Appointment';
import iCreateAppointmentDTO from '../dtos/iCreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: iCreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointments | undefined>
}