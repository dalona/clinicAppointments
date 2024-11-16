import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'The password must have at least one uppercase, one lowercase letter, and a number' },
  )
  password: string;

  @IsNotEmpty()
  role: Role;
}
