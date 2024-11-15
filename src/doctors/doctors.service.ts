import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto} from '../doctors/dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';


@Injectable()
export class DoctorService {
  private doctors = [];

  createDoctor(createDoctorDto: CreateDoctorDto) {
    const newDoctor = { id: Date.now().toString(), ...createDoctorDto };
    this.doctors.push(newDoctor);
    return newDoctor;
  }

  findAll() {
    return this.doctors;
  }

  findOne(id: string) {
    const doctor = this.doctors.find((doc) => doc.id === id);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return doctor;
  }

  updateDoctor(id: string, updateDoctorDto: UpdateDoctorDto) {
    const doctorIndex = this.doctors.findIndex((doc) => doc.id === id);
    if (doctorIndex === -1) {
      throw new NotFoundException('Doctor not found');
    }
    this.doctors[doctorIndex] = { ...this.doctors[doctorIndex], ...updateDoctorDto };
    return this.doctors[doctorIndex];
  }

  remove(id: string) {
    const doctorIndex = this.doctors.findIndex((doc) => doc.id === id);
    if (doctorIndex === -1) {
      throw new NotFoundException('Doctor not found');
    }
    this.doctors.splice(doctorIndex, 1);
    return { message: 'Doctor removed' };
  }
}