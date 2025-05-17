import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';
import dotenv from 'dotenv';
dotenv.config();

import UserService from '../services/User.services';
import { generateOTP, validateOTP } from '../services/OTP.services';
import { User } from '../entities/User.entity';
import { generateToken, validateTokenSingle } from '../utils/auth.utils';
import { sendMail } from '../utils/mailer.utils';
import { SendMailOptions } from 'nodemailer';
import { OTPEmail } from '../utils/emailTemplates.utils';

const oAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, 'postmessage');

class AuthController {
    static signUp: RequestHandler = async (req, res, next) => {
        const user: User = { ...req.body };
        const services = new UserService();
        try {
            const existed = await services.findByEmail(user.email);
            if (existed) {
                next(createHttpError(401, 'Existed Email'));
                return;
            }
            const createdUser = services.create(user);
            res.status(200).json({
                statusCode: 200,
                msg: 'Create new user success',
                metadata: { ...createdUser },
            });
            return;
        } catch (error) {
            next(error);
            throw error;
        }
    };

    // multi-session authentication
    static signIn: RequestHandler = async (req, res, next) => {
        const user: Pick<User, 'email' | 'password'> = { ...req.body };
        const services = new UserService();
        try {
            const existed = await services.findByEmail(user.email);
            if (!existed) {
                next(createHttpError(404, 'Not Found User'));
                return;
            }
            if (existed?.password !== user.password) {
                next(createHttpError(401, 'Wrong password'));
                return;
            }

            generateToken(res, existed._id);

            res.status(200).json({
                statusCode: 200,
                msg: 'Signed In Success',
                metadata: { ...existed },
            });
            return;
        } catch (error) {
            next(error);
            throw error;
        }
    };

    static signInWithGoogle: RequestHandler = async (req, res, next) => {
        const { code } = req.body;
        const services = new UserService();

        try {
            const response = await oAuth2Client.getToken(code);
            const token = response.tokens;
            const ticket = await oAuth2Client
                .verifyIdToken({
                    idToken: token.id_token as string,
                    audience: process.env.GOOGLE_CLIENT_ID,
                })
                .then((ticket): LoginTicket => ticket)
                .catch((error) => {
                    next(error);
                    throw error;
                });
            const payload = (ticket as LoginTicket).getPayload();
            const existed = await services.findByEmail((payload as TokenPayload).email as string);
            console.log(existed);

            if (!existed) {
                const user = await services.create({
                    fullname: (payload as TokenPayload).name as string,
                    username: (payload as TokenPayload).email as string,
                    email: (payload as TokenPayload).email as string,
                });
                if (user) {
                    generateToken(res, user._id);
                    res.status(200).json({
                        statusCode: 200,
                        msg: 'Signed In Success',
                        metadata: { ...user },
                    });
                    return;
                }
            }
            if (existed) {
                generateToken(res, existed._id);
            }
            res.status(200).json({
                statusCode: 200,
                msg: 'Signed In Success',
                metadata: { ...existed },
            });
            return;
        } catch (error) {
            next(error);
            throw error;
        }
    };

    static signOut: RequestHandler = async (req, res, next) => {
        res.clearCookie('token');
        res.status(200).json({
            statusCode: 200,
            msg: 'Signed Out Success',
        });
        return;
    };

    // multi-session verify authorization
    static verifyAuth: RequestHandler = async (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
            next(createHttpError(401, 'No credentials provide'));
            return;
        }
        jwt.verify(token as string, process.env.SECRET_KEY as string, (err, decoded) => {
            if (err) {
                next(createHttpError(401, 'Credential Expired'));
                res.clearCookie('token');
                return;
            }
            const payload = decoded as JwtPayload;
            (req as any)._id = payload._id;
            next();
        });
    };

    // single-session verify authorization
    static verifyAuthSingle: RequestHandler = async (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
            next(createHttpError(401, 'No credentials provide'));
            return;
        }
        jwt.verify(token as string, process.env.SECRET_KEY as string, async (err, decoded) => {
            if (err) {
                res.clearCookie('token');
                next(createHttpError(401, 'Credential Expired'));
                return;
            }
            const payload = decoded as JwtPayload;
            const user = payload._id;
            const isValid = await validateTokenSingle(user, token);
            console.log(isValid);

            if (!isValid) {
                res.clearCookie('token');
                next(createHttpError(401, 'Credential Expired'));
                return;
            }
            (req as any)._id = user;
            next();
        });
    };

    static resetPassword: RequestHandler = async (req, res, next) => {
        const { email } = req.body;
        const service = new UserService();
        try {
            const existed = await service.findByEmail(email);
            if (!existed) {
                next(createHttpError(404, 'Email Not Existed in System'));
                return;
            }
            const mailOptions: SendMailOptions = {
                to: email,
                subject: 'Your OTP',
                html: OTPEmail(await generateOTP(existed._id, email)),
            };

            const result = await sendMail(mailOptions);
            if (result) {
                res.status(200).json({
                    statusCode: 200,
                    msg: 'OTP Sent',
                    metadata: { ...result },
                });
                return;
            }
        } catch (error) {
            next(error);
            throw error;
        }
    };

    static verifyOTP: RequestHandler = async (req, res, next) => {
        const { email, code } = req.body;
        try {
            const isValid = await validateOTP(email, code);
            if (!isValid) {
                next(createHttpError(401, 'Wrong or Expired Verification Code. Please resend'));
                return;
            }

            generateToken(res, isValid);

            res.status(200).json({
                statusCode: 200,
                msg: 'Signin Success',
            });
            return;
        } catch (error) {
            next(error);
            throw error;
        }
    };
}

export default AuthController;
