import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,

    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,

    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const { doctorId, patientId, date, reason, notes } = createAppointmentDto;

    const appointmentDate = new Date(date);

    const doctor = await this.doctorRepository.findOne({ where: { id: doctorId } });
    if (!doctor) throw new NotFoundException('Doctor not found');
    
    const patient = await this.patientRepository.findOne({ where: { id: patientId } });
    if (!patient) throw new NotFoundException('Patient not found');
    

    const existingAppointment = await this.appointmentRepository.findOne({
      where: {
        doctor: { id: doctorId }, 
        date: appointmentDate,
      },
    });
    
    if (existingAppointment) throw new ConflictException('The doctor is not available at this time');

    const appointment = this.appointmentRepository.create({
      date: appointmentDate,
      reason,
      notes,
      doctor,
      patient,
    });

    return this.appointmentRepository.save(appointment);
  }

  async findAppointmentsByFilter(filters: any): Promise<Appointment[]> {
    const query = this.appointmentRepository.createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .leftJoinAndSelect('appointment.patient', 'patient');

    if (filters.date) {
      query.andWhere('appointment.date = :date', { date: filters.date });
    }

    if (filters.specialty) {
      query.andWhere('doctor.specialty = :specialty', { specialty: filters.specialty });
    }

    if (filters.reason) {
      query.andWhere('appointment.reason LIKE :reason', { reason: `%${filters.reason}%` });
    }

    return query.getMany();
  }
}

