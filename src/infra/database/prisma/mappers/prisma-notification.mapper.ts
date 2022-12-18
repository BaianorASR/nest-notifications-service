import { Notification as PrismaNotification } from '@prisma/client';

import { Notification } from '@app/entities/notification.entity';

export class PrismaNotificationMapper {
  static toPersistence(notification: Notification): PrismaNotification {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      readAt: notification.readAt,
      canceledAt: notification.cancelAt,
      createdAt: notification.createdAt,
    };
  }
}
