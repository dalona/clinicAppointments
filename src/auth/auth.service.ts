import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { loginUserDto } from './dto/login.dto';
import { Patient } from 'src/patients/entities/patient.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { User } from 'src/auth/interfaces/user.interface'; 

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,

    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,

    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: loginUserDto) {
    const { email, password } = loginDto;

    // Try to find the user in Patient and Doctor tables
    let user: User = await this.patientRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role'],
    });

    if (!user) {
      user = await this.doctorRepository.findOne({
        where: { email },
        select: ['id', 'email', 'password', 'role'],
      });
    }

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Validate password
    const isPasswordValid = await this.validatePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = this.generateJwtToken({ email: user.email, role: user.role });

    // Return response with user data and token
    return this.buildLoginResponse(user, token);
  }

  private async validatePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }

  private generateJwtToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  private buildLoginResponse(user: User, token: string) {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      token: token,
    };
  }
}
