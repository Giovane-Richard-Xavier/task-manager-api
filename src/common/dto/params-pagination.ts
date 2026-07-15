export class ParamsPaginationDto {
  page?: number = 1;
  limit?: number = 10;
  sort?: "asc" | "desc" = "desc";
}
