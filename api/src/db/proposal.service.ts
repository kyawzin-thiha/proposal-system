import { Injectable } from "@nestjs/common";
import { Status } from "@prisma/client";
import { PrismaService } from "src/helper/prisma.service";
import { ProposalDetailDto, ProposalDto, ProposalsDto } from "src/types/database.dto";
import { ErrorDto } from "src/types/error.dto";

@Injectable()
export class ProposalDbService {
    constructor(private readonly prisma: PrismaService) { }

    async create(author: string, title: string, description: string): Promise<[ProposalDto, ErrorDto]> {
        try {
            const proposal = await this.prisma.proposal.create({
                data: {
                    title,
                    description,
                    author: {
                        connect: {
                            id: author,
                        }
                    }
                },
                include: {
                    author: true,
                }
            })
            return [proposal, null]
        } catch (error) {
            return [null, { message: "Internal Server Error", status: 500 }]
        }
    }

    async find(id: string): Promise<[ProposalDetailDto, ErrorDto]> {
        try {
            const proposal = await this.prisma.proposal.findUnique({
                where: {
                    id,
                },
                include: {
                    author: true,
                    comments: true,
                }
            })

            if (!proposal) {
                return [null, { message: "Proposal not found", status: 404 }]
            }

            return [proposal, null]
        } catch (error) {
            return [null, { message: "Internal Server Error", status: 500 }]
        }
    }

    async getAll(): Promise<[ProposalsDto, ErrorDto]> {
        try {
            const proposals = await this.prisma.proposal.findMany({
                orderBy: [
                    {
                        createdAt: "desc"
                    },
                    {
                        likedBy: {
                            _count: "desc"
                        }
                    }
                ],
                include: {
                    author: true,
                }
            })
            return [proposals, null]
        } catch (error) {
            return [null, { message: "Internal Server Error", status: 500 }]
        }
    }

    async getByStatus(status: Status): Promise<[ProposalsDto, ErrorDto]> {
        try {
            const proposals = await this.prisma.proposal.findMany({
                where: {
                    status
                },
                orderBy: [
                    {
                        createdAt: "desc"
                    },
                    {
                        likedBy: {
                            _count: "desc"
                        }
                    }
                ],
                include: {
                    author: true,
                }
            })
            return [proposals, null]
        } catch (error) {
            return [null, { message: "Internal Server Error", status: 500 }]
        }
    }

    async update(id: string, title: string, description: string): Promise<ErrorDto> {
        try {
            await this.prisma.proposal.update({
                where: {
                    id,
                },
                data: {
                    title,
                    description,
                }
            })
        } catch (error) {
            return { message: "Internal Server Error", status: 500 }
        }
    }

    async updateStatus(id: string, status: Status): Promise<ErrorDto> {
        try {
            await this.prisma.proposal.update({
                where: {
                    id,
                },
                data: {
                    status,
                }
            })
        } catch (error) {
            return { message: "Internal Server Error", status: 500 }
        }
    }

    async addLike(id: string, user: string): Promise<ErrorDto> {
        try {
            await this.prisma.proposal.update({
                where: {
                    id,
                },
                data: {
                    likedBy: {
                        connect: {
                            id: user,
                        }
                    }
                }
            })
        } catch (error) {
            return { message: "Internal Server Error", status: 500 }
        }
    }

    async removeLike(id: string, user: string): Promise<ErrorDto> {
        try {
            await this.prisma.proposal.update({
                where: {
                    id,
                },
                data: {
                    likedBy: {
                        disconnect: {
                            id: user,
                        }
                    }
                }
            })
        } catch (error) {
            return { message: "Internal Server Error", status: 500 }
        }
    }

    async delete(id: string): Promise<ErrorDto> {
        try {
            await this.prisma.proposal.delete({
                where: {
                    id,
                }
            })
        } catch (error) {
            return { message: "Internal Server Error", status: 500 }
        }
    }
}