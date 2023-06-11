import User from '../models/User';
import { Service } from 'typedi';

@Service()
export default class UserRepository {
  createUser = async (firstName: string, email: string, lastName: string, token: string, role: string): Promise<User> => {
    const user = User.build({ firstName, lastName, email, token, role });
    return await user.save();
  };

  findByEmail = async (email: string): Promise<User | null> => {
    return await User.findOne({ where: { email } });
  };

  getAllUsers = async (): Promise<User[]> => {
    return await User.findAll();
  };
}
