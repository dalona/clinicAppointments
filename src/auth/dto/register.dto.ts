import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'The password must have an uppercase, lowercase letter, and a number' },
  )
  password: string;

  @IsEnum(Role, { message: 'Role must be either "doctor" or "patient"' })
  @IsNotEmpty()
  role: Role;

  @IsString()
  @IsNotEmpty()
  name?: string; // Optional for patients, required for doctors
}
