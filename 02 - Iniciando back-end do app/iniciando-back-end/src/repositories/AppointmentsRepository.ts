import Appointment from "../models/Appointment";
import { EntityRepository, Repository } from 'typeorm';

// interface CreateAppointmentDTO {
//   provider: string;
//   date: Date;
// }

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>{


  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date }
    })
    return findAppointment || null;
  }
}

export default AppointmentsRepository;
