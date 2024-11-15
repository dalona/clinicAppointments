import { Injectable, ConflictException } from '@nestjs/common';
import { AppointmentRepository } from './appointment.repository';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    const { doctorId, date } = createAppointmentDto;

    // Check if the doctor is available
    const existingAppointment = await this.appointmentRepository.findByDoctorAndDate(doctorId, date);
    if (existingAppointment) {
      throw new ConflictException('The doctor already has an appointment scheduled at this time.');
    }

    return this.appointmentRepository.create(createAppointmentDto);
  }
}
