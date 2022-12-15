import { Body, Controller, Post } from '@nestjs/common';

import { CreateNotificationsDto } from '../dtos/create-notifications.dto';
import { NotificationViewModel } from '../view-models/notification.view-model';

import { SendNotification } from '@app/use-cases/send-notification.use-case';

@Controller()
export class NotificationsController {
  constructor(private readonly sendNotification: SendNotification) {}

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
