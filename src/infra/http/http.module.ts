import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { NotificationsController } from './controllers/notifications.controller';

import { SendNotification } from '@app/use-cases/send-notification.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HttpModule {}
