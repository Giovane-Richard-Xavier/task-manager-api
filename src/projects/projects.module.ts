import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TasksService } from 'src/tasks/tasks.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService, TasksService],
})
export class ProjectsModule {}
