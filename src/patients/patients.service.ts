import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  createPatient: any;
  updatePatient: any;
  constructor(
    @InjectRepository(Patient) 
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(patient: Partial<Patient>): Promise<Patient> {
    const newPatient = this.patientRepository.create(patient);
    return this.patientRepository.save(newPatient);
  }

  async findAll(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  async findOne(id: string): Promise<Patient> {
    return this.patientRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.patientRepository.delete(id);
  }
}
