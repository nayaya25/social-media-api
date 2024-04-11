import jwt, { JsonWebTokenError, JwtPayload} from 'jsonwebtoken';

const generateToken = (payload: object) => {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET || 'secretKey', { expiresIn: '1h' });
    } catch (e: any) {
        console.error(e.stack)
        throw new Error('Error Generating Token')
    }
};

const verifyToken = (token: string): JwtPayload | string => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
    }catch (e: any) {
        console.error(e.stack)
        throw new JsonWebTokenError("Invalid Token")
    }
};

export { generateToken, verifyToken };
