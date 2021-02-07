export default {
    jwt: {
        secret: process.env.TOKEN_HASH as string,
        expiresIn: '1d',
    },
};
