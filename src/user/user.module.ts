import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectsService } from 'src/projects/projects.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, ProjectsService],
})
export class UserModule {}
