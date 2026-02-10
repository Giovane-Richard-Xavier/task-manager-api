import { ENUM_STATUS } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ENUM_STATUS, { message: 'Status inválido' })
  status: ENUM_STATUS;

  @Type(() => Date)
  @IsDate()
  dueDate: Date;

  @IsString()
  @IsNotEmpty()
  projectId: string;
}
