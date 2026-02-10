import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { take } from 'rxjs';

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

  async findAllTasks(page = 1, limit = 10, sort: 'asc' | 'desc' = 'desc') {
    const currentPage = Math.max(page, 1);
    const currentLimit = Math.max(limit, 1);

    const total = await this.prisma.task.count();

    const tasks = await this.prisma.task.findMany({
      skip: (currentPage - 1) * currentLimit,
      take: currentLimit,
      orderBy: { createdAt: sort },
      include: { project: { select: { name: true, description: true } } },
    });

    return {
      data: tasks,
      meta: {
        total,
        page: currentPage,
        limit: currentLimit,
        totalPages: Math.ceil(total / currentLimit),
        hasNextPage: currentPage < Math.ceil(total / currentLimit),
        hasPrevPage: currentPage,
        sort,
      },
    };
  }

  async getTaskById(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: { project: { select: { name: true, description: true } } },
    });

    if (!task) {
      throw new NotFoundException(`Não encontrada Tarefa com ID: ${id}`);
    }

    return task;
  }

  async getTasksByProjectId(projectId: string) {
    const task = await this.prisma.task.findMany({ where: { projectId } });

    if (!task) {
      throw new NotFoundException(
        `Não encontrada Tarefa com projectId: ${projectId}`,
      );
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const data = await this.prisma.task.findUnique({ where: { id } });

    if (!data) {
      throw new NotFoundException(`Não encontrada Tarefa com projectId: ${id}`);
    }

    const task = await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });

    return task;
  }

  async remove(id: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Não encontrada Tarefa com ID: ${id}`);
    }

    await this.prisma.task.delete({ where: { id } });

    return { message: 'Tarefa removida com sucesso!' };
  }
}
