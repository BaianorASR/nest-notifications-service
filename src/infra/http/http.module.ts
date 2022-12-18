import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { NotificationsController } from './controllers/notifications.controller';

import { SendNotification } from '@app/use-cases/send-notification.use-case';
import { CancelNotificationUseCase } from '@app/use-cases/cancel-notification.use-case';
import { CounterRecipientNotificationsUseCase } from '@app/use-cases/count-recipient-notifications.use-case';
import { ReadNotificationUseCase } from '@app/use-cases/read-notification.use-case';
import { UnreadNotificationUseCase } from '@app/use-cases/unread-notification.use-case';
import { GetRecipientNotificationsUseCase } from '@app/use-cases/get-recipient-notifications.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotificationUseCase,
    CounterRecipientNotificationsUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
    GetRecipientNotificationsUseCase,
  ],
})
export class HttpModule {}
