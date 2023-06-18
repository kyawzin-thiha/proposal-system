import { HttpException, Injectable } from '@nestjs/common';
import { AccountDbService } from 'src/db/account.service';
import { BcryptService } from 'src/helper/bcrypt.service';
import { JwtTokenService } from 'src/helper/jwt.service';

@Injectable()
export class AuthService {
    constructor(private readonly account: AccountDbService, private readonly bcrypt: BcryptService, private readonly jwt: JwtTokenService) { }

    private generateToken(payload: any) {
        const [token, error] = this.jwt.sign(payload);

        if (error) {
            throw new HttpException(error.message, error.status);
        }

        return token;
    }

    async login(username: string, password: string) {
        const [account, error] = await this.account.findByUsername(username);

        if (error) {
            throw new HttpException(error.message, error.status);
        }

        const isPasswordCorrect = this.bcrypt.compareValue(password, account.password);

        if (!isPasswordCorrect) {
            throw new HttpException('Invalid username or password', 401);
        }

        const payload = {
            id: account.id,
            user: account.user.id,
            role: account.role,
        }

        const token = this.generateToken(payload);

        return token;
    }

    async register(name: string, username: string, password: string) {
        const hashedPassword = this.bcrypt.hashValue(password);

        const [account, error] = await this.account.create(name, username, hashedPassword);

        if (error) {
            throw new HttpException(error.message, error.status);
        }

        const payload = {
            id: account.id,
            user: account.user.id,
            role: account.role,
        }

        const token = this.generateToken(payload);

        return token;
    }
}
