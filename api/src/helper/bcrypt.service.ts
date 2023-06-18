import { Injectable } from "@nestjs/common";
import { hashSync, genSaltSync, compareSync } from 'bcryptjs';
@Injectable()
export class BcryptService {

    async hashValue(input: string): Promise<string> {
        return hashSync(input, genSaltSync(11));
    }
    async compareValue(input: string, hash: string): Promise<boolean> {
        return compareSync(input, hash);
    }
}