import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        email = email.toLowerCase();
        if (email == 'a01283181@tec.mx' && password == '123') {
            return done(null, { email, password });
        }
        return done(null, false, { message: 'Incorrect email or password.' });
    })
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj: any, done) =>  done(null, obj));

export default passport;