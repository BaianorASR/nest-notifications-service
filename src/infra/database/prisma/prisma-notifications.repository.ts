import { Notification } from 'src/app/entities/notification.entity';

import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '../../../app/repositories/notifications.repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create({
    id,
    recipientId,
    content,
    category,
    readAt,
    createdAt,
  }: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id,
        recipientId,
        content: content.value,
        category,
        readAt,
        createdAt,
      },
    });
  }
}
