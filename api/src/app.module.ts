import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelperModule } from './helper/helper.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [HelperModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
