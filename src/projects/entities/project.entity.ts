import { Project } from '@prisma/client';

export class ProjectEntity implements Project {
  id: string;
  name: string;
  description: string | null;
  userId: string;
  createdAt: Date;
  updatedeAt: Date;
}
