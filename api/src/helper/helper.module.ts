import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';
import { BcryptService } from './bcrypt.service';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
        }),
    ],
    providers: [PrismaService, JwtTokenService, BcryptService],
    exports: [PrismaService, JwtTokenService, BcryptService],
})
export class HelperModule { }
