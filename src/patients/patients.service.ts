import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async createPatient(createPatientDto: CreatePatientDto): Promise<Patient> {
    const newPatient = this.patientRepository.create(createPatientDto); // Crea una instancia del paciente
    return this.patientRepository.save(newPatient); // Guarda el paciente en la base de datos
  }

  async findAll(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  async findOne(id: string): Promise<Patient> {
    return this.patientRepository.findOne({ where: { id } });
  }
}
