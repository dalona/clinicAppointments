import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  private patients = [];

  createPatient(createPatientDto: CreatePatientDto) {
    const newPatient = { id: Date.now().toString(), ...createPatientDto };
    this.patients.push(newPatient);
    return newPatient;
  }

  findAll() {
    return this.patients;
  }

  findOne(id: string) {
    const patient = this.patients.find((pat) => pat.id === id);
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    return patient;
  }

  updatePatient(id: string, updatePatientDto: UpdatePatientDto) {
    const patientIndex = this.patients.findIndex((pat) => pat.id === id);
    if (patientIndex === -1) {
      throw new NotFoundException('Patient not found');
    }
    this.patients[patientIndex] = { ...this.patients[patientIndex], ...updatePatientDto };
    return this.patients[patientIndex];
  }

  remove(id: string) {
    const patientIndex = this.patients.findIndex((pat) => pat.id === id);
    if (patientIndex === -1) {
      throw new NotFoundException('Patient not found');
    }
    this.patients.splice(patientIndex, 1);
    return { message: 'Patient removed' };
  }
}