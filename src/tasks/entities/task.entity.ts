import { $Enums, Task } from '@prisma/client';

export class TaskEntity implements Task {
  id: string;
  title: string;
  description: string | null;
  status: $Enums.ENUM_STATUS;
  dueDate: Date;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}
