import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register.dto';
import { Patient } from 'src/patients/entities/patient.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,

    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<any> {
    const { email, password, role, name } = registerUserDto;

    // Check if email already exists in both repositories
    const emailExists =
      (await this.patientRepository.findOne({ where: { email } })) ||
      (await this.doctorRepository.findOne({ where: { email } }));
    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === 'doctor') {
      const doctor = this.doctorRepository.create({
        email,
        password: hashedPassword,
        role,
        name, // Only doctors have a name
      });
      return this.doctorRepository.save(doctor);
    }

    if (role === 'patient') {
      const patient = this.patientRepository.create({
        email,
        password: hashedPassword,
        role,
      });
      return this.patientRepository.save(patient);
    }

    throw new ConflictException('Invalid role');
  }
}
