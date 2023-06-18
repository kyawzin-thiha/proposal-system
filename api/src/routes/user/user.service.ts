import { HttpException, Injectable } from '@nestjs/common';
import { AccountDbService } from 'src/db/account.service';
import { UserDbService } from 'src/db/user.service';

@Injectable()
export class UserService {
    constructor(private readonly account: AccountDbService, private readonly user: UserDbService) { }

    async getProfile(id: string) {
        const [user, error] = await this.user.find(id);

        if (error) {
            throw new HttpException(error.message, error.status);
        }

        return user;
    }

    async promoteToAdmin(id: string) {
        const error = await this.account.updateRole(id, "ADMIN");

        if (error) {
            throw new HttpException(error.message, error.status);
        }

        return;
    }
}
