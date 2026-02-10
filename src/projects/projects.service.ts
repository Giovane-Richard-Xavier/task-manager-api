import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: createProjectDto.userId },
    });

    if (!existingUser) {
      throw new BadRequestException('User not found in the system!');
    }

    const project = await this.prisma.project.create({
      data: createProjectDto,
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });

    return project;
  }

  async findAllProjects(page = 1, limit = 10, sort: 'asc' | 'desc' = 'desc') {
    const currentPage = Math.max(page, 1);
    const currentLimit = Math.max(limit, 1);

    const total = await this.prisma.project.count();

    const projects = await this.prisma.project.findMany({
      skip: (currentPage - 1) * currentLimit,
      take: currentLimit,
      orderBy: { createdAt: sort },
      include: {
        user: {
          select: { name: true, email: true },
        },
        tasks: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            dueDate: true,
          },
        },
      },
    });

    return {
      data: projects,
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

  async getProjectById(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: { user: { select: { name: true, email: true } } },
    });

    if (!project) {
      throw new BadRequestException(`Projeto não encotrado para ID: ${id}`);
    }

    return project;
  }

  async getProjectByUserId(userId: string) {
    const projects = await this.prisma.project.findMany({
      where: { userId },
    });

    if (!projects) {
      throw new BadRequestException(
        `Projetos não encotrado para o userId: ${userId}`,
      );
    }

    return projects;
  }

  async remove(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        _count: {
          select: { tasks: true },
        },
      },
    });

    if (!project) {
      throw new NotFoundException(`Nenhum Projeto encontrado com ID: ${id}`);
    }

    if (project._count.tasks > 0) {
      throw new ConflictException(
        'Projeto não pode ser removido pois possui tarefas vinculadas!',
      );
    }

    await this.prisma.project.delete({ where: { id } });

    return { message: 'Projeto removido com sucesso!' };
  }
}
