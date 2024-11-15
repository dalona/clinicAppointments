import { Module } from '@nestjs/common';
import { PatientController } from './patients.controller';
import { PatientService } from './patients.service';

@Module({
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientsModule {}
