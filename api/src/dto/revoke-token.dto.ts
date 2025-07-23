import { IsString, IsNotEmpty } from 'class-validator';

export class RevokeTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
