import { Injectable } from "@nestjs/common";
import { hashSync, genSaltSync, compareSync } from 'bcryptjs';
@Injectable()
export class BcryptService {

    hashValue(input: string): string {
        return hashSync(input, genSaltSync(11));
    }
    compareValue(input: string, hash: string): boolean {
        return compareSync(input, hash);
    }
}