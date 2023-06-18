import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/helper/prisma.service";
import { UserDto } from "src/types/database.dto";
import { ErrorDto } from "src/types/error.dto";

@Injectable()
export class UserDbService {
    constructor(private readonly prisma: PrismaService) { }

    async find(id: string): Promise<[UserDto, ErrorDto]> {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id
                }
            })
            if (!user) {
                return [null, { message: "User not found", status: 404 }]
            }

            return [user, null]
        } catch (error) {
            return [null, { message: "Internal Server Error", status: 500 }]
        }
    }
}