import { hash, compare } from 'bcryptjs';

import IHashProvider from './IHashProvider';

class HashProvider implements IHashProvider {
    public async generateHash(payload: string): Promise<string> {
        const cryptoPassword = await hash(payload, 8);

        return cryptoPassword;
    }
    public async compareHash(
        payload: string,
        hashed: string
    ): Promise<boolean> {
        const payloadMatched = await compare(payload, hashed);

        return payloadMatched;
    }
}

export default HashProvider;
