import { Module } from '@nestjs/common';

import { KafkaConsumerService } from './kafka-consumer.service';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  providers: [KafkaConsumerService],
  controllers: [NotificationsController],
})
export class MessagingModule {}
