import { BadRequestException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Usuário já cadastrado com este email.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    return {
      ...user,
      password: undefined,
    };
  }

  async findAllUsersPaginated(
    page = 1,
    limit = 10,
    sort: 'asc' | 'desc' = 'desc',
  ) {
    const currentPage = Math.max(page, 1);
    const currentLimit = Math.max(limit, 1);

    const total = await this.prisma.user.count();

    const users = await this.prisma.user.findMany({
      skip: (currentPage - 1) * currentLimit,
      take: currentLimit,
      orderBy: { createdAt: sort },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      data: users,
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

  async getUserById(id: string) {
    const user = this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new BadRequestException(`Não encontrado usuário para ID: ${id}`);
    }

    return user;
  }

  async remove(id: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new BadRequestException(`Não encontrado usuário para ID: ${id}`);
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
