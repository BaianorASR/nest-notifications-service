import { GetRecipientNotificationsUseCase } from './get-recipient-notifications.use-case';

import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { NotificationsRepository } from '@app/repositories/notifications.repository';
import { makeNotification } from '@test/factories/make-notification';

describe('GetRecipientNotificationsUseCase', () => {
  let notificationsRepository: NotificationsRepository;
  let getRecipientNotificationsUseCase: GetRecipientNotificationsUseCase;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    getRecipientNotificationsUseCase = new GetRecipientNotificationsUseCase(
      notificationsRepository,
    );
  });

  it('should be able to get the notifications for a given recipient', async () => {
    const recipientId = 'recipient-123';

    const notification1 = makeNotification({ recipientId });
    const notification2 = makeNotification();

    await notificationsRepository.create(notification1);
    await notificationsRepository.create(notification2);
    await notificationsRepository.create(notification1);

    const { notifications } = await getRecipientNotificationsUseCase.execute({
      recipientId,
    });

    expect(notifications).toHaveLength(2);
  });

  it('should be able to return an empty array if there are no notifications for the recipient', async () => {
    const { notifications } = await getRecipientNotificationsUseCase.execute({
      recipientId: 'recipient-123',
    });

    expect(notifications).toHaveLength(0);
  });
});
