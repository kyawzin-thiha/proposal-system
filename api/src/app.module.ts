import { Module } from '@nestjs/common';
import { HelperModule } from './helper/helper.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './routes/auth/auth.module';
import { UserModule } from './routes/user/user.module';
import { ProposalModule } from './routes/proposal/proposal.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './guards/role.guard';
import { CommentModule } from './routes/comment/comment.module';

@Module({
  imports: [HelperModule, DbModule, AuthModule, UserModule, ProposalModule, CommentModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    }
  ]
})
export class AppModule { }
