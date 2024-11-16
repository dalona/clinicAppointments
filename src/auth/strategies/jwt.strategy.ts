import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
// import { Admin } from "src/admins/entities/admin.entity"; // Importar entidad de Admin
import { Patient } from "src/patients/entities/patient.entity"; // Importar entidad de Patient
import { Doctor } from "src/doctors/entities/doctor.entity"; // Importar entidad de Doctor

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        // @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
        @InjectRepository(Patient) private readonly patientRepository: Repository<Patient>,
        @InjectRepository(Doctor) private readonly doctorRepository: Repository<Doctor>,
        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<any> {
        const { email, role } = payload;

        let user;

        // Depending on the role in the payload, search the corresponding entity
        switch (role) {
            // case 'admin':
            //     user = await this.adminRepository.findOne({ where: { email } });
            //     break;
            case 'patient':
                user = await this.patientRepository.findOne({
                    where: {
                        email: email, 
                    },
                });
                break;
            case 'doctor':
                user = await this.doctorRepository.findOne({
                    where: {
                        email: email, 
                    },
                });
                break;
            default:
                throw new UnauthorizedException('Invalid Role');
        }

        if (!user) throw new UnauthorizedException('Invalid Token');

        return user;
    }
}