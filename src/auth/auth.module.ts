import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { Patient } from 'src/patients/entities/patient.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { PatientsModule } from 'src/patients/patients.module';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { PatientsService } from 'src/patients/patients.service';
import { DoctorsService } from 'src/doctors/doctors.service';

@Module({
    imports:[ConfigModule ,TypeOrmModule.forFeature([Patient,Doctor]), 
    PatientsModule,DoctorsModule,
      PassportModule.register({defaultStrategy:'jwt'}),
      JwtModule.registerAsync({
        imports:[ConfigModule],
        useFactory:(configService:ConfigService)=>{      
          return {
            secret:configService.get('JWT_SECRET'),
            signOptions:{expiresIn:'2h'}
        }},
        inject:[ConfigService],
      }),
      
    ],
    controllers: [AuthController],
    providers: [AuthService, PatientsService, DoctorsService, JwtStrategy],
    exports:[TypeOrmModule, JwtStrategy, PassportModule, JwtModule]
  })
  export class AuthModule {}
