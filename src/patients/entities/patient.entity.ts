import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Role } from 'src/common/enums/role.enum';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid') // Genera un UUID automáticamente
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];
}
