import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class CreateDoctorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role, { message: 'Role must be "doctor"' })
  role: Role;
}
