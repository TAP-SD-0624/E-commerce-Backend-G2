import jwt from 'jsonwebtoken';
export const createToken = (id: number, role: string) => jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '3d' });
