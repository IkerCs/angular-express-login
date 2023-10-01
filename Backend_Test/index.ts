import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';

import passport from './passport';
import router from './router';

const app = express();

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: '1234567',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.use(cookieParser('7654321'));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

app.listen(3000, () => console.log('Server running on port 3000'));