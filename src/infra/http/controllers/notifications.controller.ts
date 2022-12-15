import { SendNotification } from 'src/app/use-cases/send-notification.use-case';

import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationsDto } from '../dtos/create-notifications.dto';
import { Notification } from 'src/app/entities/notification.entity';

@Controller()
export class NotificationsController {
  constructor(private readonly sendNotification: SendNotification) {}

  @Post()
  async create(
    @Body() { recipientId, content, category }: CreateNotificationsDto,
  ): Promise<Notification> {
    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return notification;
  }
}
