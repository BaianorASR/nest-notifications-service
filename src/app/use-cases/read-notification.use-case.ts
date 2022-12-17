import { Injectable } from '@nestjs/common';

import { NotificationNotFoundError } from './errors/notification-not-fount.error';

import { NotificationsRepository } from '@app/repositories/notifications.repository';

interface ReadNotificationUseCaseRequest {
  notificationId: string;
}

type ReadNotificationUseCaseResponse = void;

@Injectable()
export class ReadNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute({
    notificationId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
