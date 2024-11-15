export class CreateDoctorDto {
    name: string;
    specialty: string;
    availableTimes: string[]; // Horarios de disponibilidad en formato "HH:mm-HH:mm"
  }