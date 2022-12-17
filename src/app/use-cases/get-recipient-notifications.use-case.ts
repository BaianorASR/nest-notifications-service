import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '@app/repositories/notifications.repository';
import { Notification } from '@app/entities/notification.entity';

interface GetRecipientNotificationsUseCaseRequest {
  recipientId: string;
}

interface GetRecipientNotificationsUseCaseResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotificationsUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute({
    recipientId,
  }: GetRecipientNotificationsUseCaseRequest): Promise<GetRecipientNotificationsUseCaseResponse> {
    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
