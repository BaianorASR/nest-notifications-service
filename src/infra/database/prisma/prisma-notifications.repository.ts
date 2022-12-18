import { Injectable } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { PrismaNotificationMapper } from './mappers/prisma-notification.mapper';

import { Notification } from '@app/entities/notification.entity';
import { NotificationsRepository } from '@app/repositories/notifications.repository';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: { id: notificationId },
    });

    return notification
      ? PrismaNotificationMapper.toDomain(notification)
      : null;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: { recipientId },
    });

    return notifications.map(PrismaNotificationMapper.toDomain);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: { recipientId },
    });

    return count;
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPersistence(notification);

    await this.prismaService.notification.create({ data: raw });
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPersistence(notification);

    await this.prismaService.notification.update({
      where: { id: notification.id },
      data: raw,
    });
  }
}
