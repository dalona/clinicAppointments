import { Module } from '@nestjs/common';
import { AppointmentService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { AppointmentRepository } from './appointment.repository';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentService, AppointmentRepository], 
  exports: [AppointmentService],
})
export class AppointmentsModule {}

