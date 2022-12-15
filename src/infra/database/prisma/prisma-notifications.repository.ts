import { Injectable } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { PrismaNotificationMapper } from './mappers/prisma-notification.mapper';

import { Notification } from '@app/entities/notification.entity';
import { NotificationsRepository } from '@app/repositories/notifications.repository';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPersistence(notification);

    await this.prismaService.notification.create({ data: raw });
  }
}
