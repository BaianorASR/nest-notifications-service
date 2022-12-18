import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateNotificationsDto } from '../dtos/create-notifications.dto';
import { NotificationViewModel } from '../view-models/notification.view-model';

import { SendNotification } from '@app/use-cases/send-notification.use-case';
import { CancelNotificationUseCase } from '@app/use-cases/cancel-notification.use-case';
import { CounterRecipientNotificationsUseCase } from '@app/use-cases/count-recipient-notifications.use-case';
import { ReadNotificationUseCase } from '@app/use-cases/read-notification.use-case';
import { UnreadNotificationUseCase } from '@app/use-cases/unread-notification.use-case';
import { GetRecipientNotificationsUseCase } from '@app/use-cases/get-recipient-notifications.use-case';

@Controller()
export class NotificationsController {
  constructor(
    private readonly sendNotification: SendNotification,
    private readonly cancelNotificationUseCase: CancelNotificationUseCase,
    private readonly readNotificationUseCase: ReadNotificationUseCase,
    private readonly unreadNotificationUseCase: UnreadNotificationUseCase,
    private readonly counterRecipientNotificationsUseCase: CounterRecipientNotificationsUseCase,
    private readonly getFromRecipientUseCase: GetRecipientNotificationsUseCase,
  ) {}

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.counterRecipientNotificationsUseCase.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getFromRecipientUseCase.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }

  @Patch(':notificationId/cancel')
  async cancel(@Param('notificationId') notificationId: string) {
    return this.cancelNotificationUseCase.execute({ notificationId });
  }

  @Patch(':notificationId/read')
  async read(@Param('notificationId') notificationId: string) {
    return this.readNotificationUseCase.execute({ notificationId });
  }

  @Patch(':notificationId/unread')
  async unread(@Param('notificationId') notificationId: string) {
    return this.unreadNotificationUseCase.execute({ notificationId });
  }

  @Post()
  async create(
    @Body() { recipientId, content, category }: CreateNotificationsDto,
  ) {
    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
