import passport from "passport";
//local
import local from 'passport-local';
//github
import GitHubStrategy from 'passport-github2';
import jwt from 'passport-jwt';

import userModel from '../dao/mongo/models/user.model.js';
import cartModel from '../dao/mongo/models/cart.model.js';

import { createHash, extractCookie, generateToken, isValidPassword } from '../utils.js';
import config from './config.js';
//jwt
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

//local
const LocalStrategy = local.Strategy;
const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age, role } = req.body;
        try {
            const user = await userModel.findOne({ email: username })
            if (user) {
                console.log('User already exists');
                return done(null, false);
            }

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
                cart: (await cartModel.create({}))._id,
                role
            }
            if (newUser.email == 'adminCoder@coder.com' && password == 'coderAdmin') { (newUser.role = 'admin') };

            const result = await userModel.create(newUser);

            return done(null, result);

        } catch (error) {
            return done('[LOCAL] ERROR al crear user ' + error);
        }
    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'email',
    }, async (username, password, done) => {
        try {
            console.log("entre");
            const user = await userModel.findOne({ email: username }).lean().exec();
            if (!user) {
                console.log('User dont exist');
                return done(null, user);
            }

            if (!isValidPassword(user, password)) {
                return done(null, false)
            };

            //genera el token del jwt
            const token = generateToken(user);

            user.token = token;
            console.log(user);
            return done(null, user);
        } catch (error) {
            return done(' [LOCAL] Error al obtener user' + error)
        }
    }))

      //Inicio con gitHub
    passport.use('github', new GitHubStrategy({
       clientID: "Iv1.43cec26d4b1c847d",
       clientSecret: "83aba00509854b210e105c2662be559b80101fcf",
       callbackURL: "http://127.0.0.1:8080/api/session/githubcallback"
    }, async(accessToken, refreshToken, profile, done) => {
  try {
            const user = await UserModel.findOne({
                email: profile._json.email
            })
            if (user) return done(null, user)

            const newUser = await UserModel.create({
                first_name: profile._json.name,
                last_name: "",
                email: profile._json.email,
                age: profile._json.age,
                password: "",
                cart: await CartService.create({}),
                role: "user"
            })

            return done(null, newUser)
        } catch (error) {
            return done('Error to login with github' + error)
        }
    }))

    //jwtStrategy

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([extractCookie]),
        secretOrKey: config.private_key,
    }, async (jwt_payload, done) => {
        try {
            // returna el user
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    });
}


export default initializePassport;