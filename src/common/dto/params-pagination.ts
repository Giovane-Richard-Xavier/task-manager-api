import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsPositive } from "class-validator";

export class ParamsPaginationDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  limit?: number = 10;

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sort?: "asc" | "desc" = "desc";
}
