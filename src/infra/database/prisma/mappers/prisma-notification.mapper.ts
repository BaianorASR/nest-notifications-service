import { Notification as PrismaNotification } from '@prisma/client';

import { Notification } from '@app/entities/notification.entity';
import { NotificationContent } from '@app/entities/notification-content';

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

  static toDomain(raw: PrismaNotification): Notification {
    return new Notification(
      {
        recipientId: raw.recipientId,
        content: new NotificationContent(raw.content),
        category: raw.category,
        readAt: raw.readAt,
        createdAt: raw.createdAt,
        canceledAt: raw.canceledAt,
      },
      raw.id,
    );
  }
}
