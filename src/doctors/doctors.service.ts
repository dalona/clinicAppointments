import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = this.doctorRepository.create(createDoctorDto); // Creates a instance
    return await this.doctorRepository.save(doctor); // S<ves in DB
  }

  async findAll(): Promise<Doctor[]> {
    return await this.doctorRepository.find();
  }

  async findOne(id: string): Promise<Doctor> {
    return await this.doctorRepository.findOne({ where: { id } });
  }

  async update(id: string, updateDoctorDto: Partial<CreateDoctorDto>): Promise<Doctor> {
    await this.doctorRepository.update(id, updateDoctorDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.doctorRepository.delete(id);
  }
}
