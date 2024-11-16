import { IsUUID, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsUUID() 
  doctorId: string;

  @IsNotEmpty()
  @IsUUID() 
  patientId: string;

  @IsDateString()
  date: string;

  @IsNotEmpty()
  reason: string;

  notes?: string;
}
