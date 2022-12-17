import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '@app/repositories/notifications.repository';

interface CounterRecipientNotificationsUseCaseRequest {
  recipientId: string;
}

interface CounterRecipientNotificationsUseCaseResponse {
  count: number;
}

@Injectable()
export class CounterRecipientNotificationsUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute({
    recipientId,
  }: CounterRecipientNotificationsUseCaseRequest): Promise<CounterRecipientNotificationsUseCaseResponse> {
    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );

    return { count };
  }
}
