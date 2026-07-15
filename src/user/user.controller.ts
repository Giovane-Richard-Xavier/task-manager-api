import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query
} from '@nestjs/common';
import { ParamsPaginationDto } from 'src/common/dto/params-pagination';
import { ProjectsService } from 'src/projects/projects.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly projectService: ProjectsService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query() params: ParamsPaginationDto,
  ) {
    return this.userService.findAllUsersPaginated(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get(':userId/projects')
  getProjectByUserId(@Param('userId') userId: string) {
    return this.projectService.getProjectByUserId(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
