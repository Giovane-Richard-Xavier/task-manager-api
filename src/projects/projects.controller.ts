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
import { TasksService } from 'src/tasks/tasks.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly tasksService: TasksService,
  ) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(
    @Query() params: ParamsPaginationDto,
  ) {
    return this.projectsService.findAllProjects(params);
  }

  @Get(':id')
  getProjectById(@Param('id') id: string) {
    return this.projectsService.getProjectById(id);
  }

  @Get(':projectId/tasks')
  getTasksByProjectId(@Param('projectId') projectId: string) {
    return this.tasksService.getTasksByProjectId(projectId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
