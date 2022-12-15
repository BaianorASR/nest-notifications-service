import { Module } from '@nestjs/common';

import { PrismaService } from './infra/prisma.service';

@Module({
  providers: [PrismaService],
})
export class AppModule {}
