import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from './types';

export default async function (req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized 1' });
    }
    const bearerToken = token.split(' ')[1];
    if (!bearerToken) {
        return res.status(401).send({ message: 'Unauthorized 2' });
    }
    try {
        const payload = await jwt.verify(bearerToken, 'super-duper-secret') as User;
        req.user = payload;
    } catch (err) {
        return res.status(401).send({ message: 'Unauthorized 3' });
    }
    next();
}