import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { HttpModule } from '@infra/http/http.module';
import { MessagingModule } from '@infra/messaging/kafka/messaging.module';

@Module({
  imports: [HttpModule, DatabaseModule, MessagingModule],
  providers: [PrismaService],
})
export class AppModule {}
