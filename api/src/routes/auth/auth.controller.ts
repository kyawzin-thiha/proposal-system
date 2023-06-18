import { Body, Controller, Post, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly auth: AuthService) { }

    @UseGuards(AuthGuard)
    @Post("re-authenticate")
    async reAuthenticate() {
        return;
    }

    @Post("login")
    async login(@Body() data: { username: string, password: string }, @Response({ passthrough: true }) res) {
        const token = await this.auth.login(data.username, data.password);

        res.cookie('token', token, {
            signed: process.env.NODE_ENV === 'production',
            httpOnly: process.env.NODE_ENV === 'production',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            domain: process.env.WEB_DOMAIN,
            maxAge: 60 * 60 * 24 * 7 * 1000,
        });

        return;
    }

    @Post("register")
    async register(@Body() data: { name: string, username: string, password: string }, @Response({ passthrough: true }) res) {
        const token = await this.auth.register(data.name, data.username, data.password);

        res.cookie('token', token, {
            signed: process.env.NODE_ENV === 'production',
            httpOnly: process.env.NODE_ENV === 'production',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            domain: process.env.WEB_DOMAIN,
            maxAge: 60 * 60 * 24 * 7 * 1000,
        });

        return;
    }

    @Post("logout")
    async logout(@Response({ passthrough: true }) res) {
        res.clearCookie('token', {
            signed: process.env.NODE_ENV === 'production',
            httpOnly: process.env.NODE_ENV === 'production',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            domain: process.env.WEB_DOMAIN,
        });

        return;
    }
}
