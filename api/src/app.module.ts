import { Module } from '@nestjs/common';
import { HelperModule } from './helper/helper.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './routes/auth/auth.module';
import { UserModule } from './routes/user/user.module';

@Module({
  imports: [HelperModule, DbModule, AuthModule, UserModule]
})
export class AppModule { }
