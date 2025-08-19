import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Hashing {

    async passHash(plain: string) : Promise<string> {
        // const saltOrRounds = 10;
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(plain, salt);
        return hash;
    }
}