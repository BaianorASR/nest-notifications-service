import { CounterRecipientNotificationsUseCase } from './count-recipient-notifications.use-case';

import { NotificationsRepository } from '@app/repositories/notifications.repository';
import { makeNotification } from '@test/factories/make-notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';

describe('CounterRecipientNotificationsUseCase', () => {
  let notificationsRepository: NotificationsRepository;
  let useCase: CounterRecipientNotificationsUseCase;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    useCase = new CounterRecipientNotificationsUseCase(notificationsRepository);
  });

  it('should be able to return 0 if there are no notifications for the recipient', async () => {
    const { count } = await useCase.execute({ recipientId: 'recipient-123' });

    expect(count).toEqual(0);
  });

  it('should be able to count the notifications for a given recipient', async () => {
    const notification1 = makeNotification({ recipientId: 'recipient-123' });
    const notification2 = makeNotification({ recipientId: 'recipient-456' });

    await notificationsRepository.create(notification1);
    await notificationsRepository.create(notification2);
    await notificationsRepository.create(notification1);

    const { count } = await useCase.execute({ recipientId: 'recipient-123' });

    expect(count).toEqual(2);
  });
});
