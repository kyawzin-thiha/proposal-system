import { Module } from '@nestjs/common';
import { HelperModule } from 'src/helper/helper.module';
import { AccountDbService } from './account.service';
import { UserDbService } from './user.service';
import { ProposalDbService } from './proposal.service';
import { CommentDbService } from './comment.service';

@Module({
    imports: [HelperModule],
    providers: [AccountDbService, UserDbService, ProposalDbService, CommentDbService],
    exports: [AccountDbService, UserDbService, ProposalDbService, CommentDbService]
})
export class DbModule { }
