import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CommentService } from './comment.service';

@UseGuards(AuthGuard)
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @Post("create")
    async createComment(@Request() req: any, @Body() data: { proposal: string, text: string }) {
        return await this.commentService.create(req.user.user, data.proposal, data.text);
    }
}
