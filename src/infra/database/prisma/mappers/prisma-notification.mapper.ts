import { Notification as PrismaNotification } from '@prisma/client';

import { Notification } from '@app/entities/notification.entity';

export class PrismaNotificationMapper {
  // static toDomain(prismaNotification: PrismaNotification): Notification {
  //   return {
  //     id: prismaNotification.id,
  //     title: prismaNotification.title,
  //     description: prismaNotification.description,
  //     type: prismaNotification.type,
  //     createdAt: prismaNotification.createdAt,
  //     updatedAt: prismaNotification.updatedAt,
  //   };
  // }

  static toPersistence(notification: Notification): PrismaNotification {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }
}
