import { Injectable } from "@nestjs/common";
import { Prisma, Role } from "@prisma/client";
import { PrismaService } from "src/helper/prisma.service";
import { AccountDto } from "src/types/database.dto";
import { ErrorDto } from "src/types/error.dto";

@Injectable()
export class AccountDbService {
    constructor(private readonly prisma: PrismaService) { }

    async create(name: string, username: string, password: string): Promise<[AccountDto, ErrorDto]> {
        try {
            const account = await this.prisma.account.create({
                data: {
                    username,
                    password,
                    user: {
                        create: {
                            name
                        }
                    }
                },
                include: {
                    user: true
                }
            })
            return [account, null]
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
                return [null, { message: "Username already exists", status: 400 }]
            }
            return [null, { message: "Internal Server Error", status: 500 }]
        }
    }

    async find(id: string): Promise<[AccountDto, ErrorDto]> {
        try {
            const account = await this.prisma.account.findUnique({
                where: {
                    id
                },
                include: {
                    user: true
                }
            })
            if (!account) {
                return [null, { message: "Account not found", status: 404 }]
            }
            return [account, null]
        } catch (error) {
            return [null, { message: "Internal Server Error", status: 500 }]
        }
    }

    async findByUsername(username: string): Promise<[AccountDto, ErrorDto]> {
        try {
            const account = await this.prisma.account.findUnique({
                where: {
                    username
                },
                include: {
                    user: true
                }
            })
            if (!account) {
                return [null, { message: "Account not found", status: 404 }]
            }
            return [account, null]
        } catch (error) {
            return [null, { message: "Internal Server Error", status: 500 }]
        }
    }

    async updateRole(id: string, role: Role): Promise<ErrorDto> {
        try {
            await this.prisma.account.update({
                where: {
                    id
                },
                data: {
                    role
                }
            })
        } catch (error) {
            return { message: "Internal Server Error", status: 500 }
        }
    }

    async delete(id: string): Promise<ErrorDto> {
        try {
            await this.prisma.account.delete({
                where: {
                    id
                }
            })
        } catch (error) {
            return { message: "Internal Server Error", status: 500 }
        }
    }
}