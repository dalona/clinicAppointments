import { Injectable } from '@nestjs/common';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentRepository {
  private appointments: Appointment[] = []; // In-memory database simulation

  async findByDoctorAndDate(doctorId: string, date: Date): Promise<Appointment | undefined> {
    return this.appointments.find(
      (appointment) => appointment.doctorId === doctorId && appointment.date.getTime() === date.getTime()
    );
  }

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const newAppointment: Appointment = {
      id: Date.now().toString(), // Unique ID generation
      ...createAppointmentDto,
    };
    this.appointments.push(newAppointment);
    return newAppointment;
  }
}

