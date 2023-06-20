import { HttpException, Injectable } from '@nestjs/common';
import { CommentDbService } from 'src/db/comment.service';

@Injectable()
export class CommentService {
    constructor(private readonly comment: CommentDbService) { }

    async create(author: string, proposal: string, text: string) {
        const [comment, error] = await this.comment.create(author, proposal, text)

        if (error) {
            throw new HttpException(error.message, error.status);
        }

        return comment;
    }
}
