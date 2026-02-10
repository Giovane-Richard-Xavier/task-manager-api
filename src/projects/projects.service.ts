import { BadRequestException, Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all projects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
