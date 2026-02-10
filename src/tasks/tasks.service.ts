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
