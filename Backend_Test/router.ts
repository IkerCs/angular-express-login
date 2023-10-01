import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from './passport';
import jwtAuthentication from './jwtAuthentication';
import { User } from './types';

const router = Router();

router.get('/', (req, res) => {
    res.send({ message: 'Hello world'});
});

router.get('/failed', (req, res) => {
    res.send({ message: 'Failed'});
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/failed' }), (req, res) => {
    const user = req.user as User;
    const token = jwt.sign({ email: user.email }, 'super-duper-secret', { expiresIn: '7d' });
    console.log('cookie sent!');
    res.cookie('token', 'Bearer ' + token, {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'none',
    });
    res.send({ message: 'Cookie sent!' });
});

router.get('/verify', jwtAuthentication, (req, res) => {
    res.send({ message: 'Authorized' });
});

router.post('/logout', jwtAuthentication, (req, res) => {
    console.log('logged out');
    res.cookie('token', '', {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        expires: new Date(0),
        sameSite: 'none',
    })
    res.send({ message: 'Logged out' });
})

export default router;
