// src/doctors/entities/doctor.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/auth/interfaces/user.interface";
import { Role } from "src/common/enums/role.enum";

@Entity()
export class Doctor implements User {  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: Role;  
}
