import { Injectable } from '@nestjs/common';

import { NotificationNotFoundError } from './errors/notification-not-fount.error';

import { NotificationsRepository } from '@app/repositories/notifications.repository';

interface CancelNotificationUseCaseRequest {
  notificationId: string;
}

type CancelNotificationUseCaseResponse = void;

@Injectable()
export class CancelNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute({
    notificationId,
  }: CancelNotificationUseCaseRequest): Promise<CancelNotificationUseCaseResponse> {
    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
