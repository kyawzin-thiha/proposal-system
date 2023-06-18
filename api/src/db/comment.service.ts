import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/helper/prisma.service";
import { CommentDto } from "src/types/database.dto";
import { ErrorDto } from "src/types/error.dto";

@Injectable()
export class CommentDbService {
    constructor(private readonly prisma: PrismaService) { }

    async create(author: string, proposal: string, text: string): Promise<[CommentDto, ErrorDto]> {
        try {
            const comment = await this.prisma.comment.create({
                data: {
                    text,
                    author: {
                        connect: {
                            id: author,
                        }
                    },
                    proposal: {
                        connect: {
                            id: proposal,
                        }
                    }
                },
                include: {
                    author: true,
                }
            })
            return [comment, null]
        } catch (error) {
            return [null, { message: "Internal Server Error", status: 500 }]
        }
    }
}