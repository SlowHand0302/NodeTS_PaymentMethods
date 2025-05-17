import { RequestHandler } from 'express';
import UserService from '../services/User.services';
import { User } from '../entities/User.entity';

class UserController {
    static getAllUser: RequestHandler = async (req, res, next) => {
        const services = new UserService();

        try {
            const users = await services.findAll();
            res.status(200).json({
                statusCode: 200,
                msg: 'Get All User Success',
                metadata: [...users],
            });
            return;
        } catch (error) {
            next(error);
            throw error;
        }
    };

    static updateProfile: RequestHandler = async (req, res, next) => {
        const services = new UserService();
        const userInfor: Partial<User> = { ...req.body } as Partial<User>;
        try {
            const userUpdated = await services.update(userInfor);
            res.status(200).json({
                statusCode: 200,
                msg: 'Updated success',
                metadata: { ...userUpdated },
            });
            return;
        } catch (error) {
            next(error);
            throw error;
        }
    };
}

export default UserController;
