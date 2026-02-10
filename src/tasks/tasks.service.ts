import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const existingProject = await this.prisma.project.findUnique({
      where: { id: createTaskDto.projectId },
    });

    if (!existingProject) {
      throw new NotFoundException(
        `Não encotrado Projeto com ID: ${createTaskDto.projectId}`,
      );
    }

    const task = await this.prisma.task.create({
      data: createTaskDto,
    });

    return task;
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
