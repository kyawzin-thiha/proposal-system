import { Body, Controller, Get, Put, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role } from 'src/decorators/role.decorator';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor(private readonly user: UserService) { }

    @Get("role")
    async getRole(@Request() req) {
        const { role } = req.user;

        return role;
    }

    @Get("profile")
    async getProfile(@Request() req) {
        const { user } = req.user;

        const profile = await this.user.getProfile(user.id);

        return profile;
    }

    @Role("ADMIN")
    @Put("promote-to-admin")
    async promoteToAdmin(@Body() data: { user: string }) {
        await this.user.promoteToAdmin(data.user);

        return;
    }
}
