import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DataDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}
