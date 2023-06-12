import User from '../models/User';
import { Service } from 'typedi';
import { createToken } from '../utils/jwtToken';

const userMockData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    token: createToken({ email: 'johndoe@example.com', role: 'standard' }),
    role: 'standard',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'janesmith@example.com',
    token: createToken({ email: 'janesmith@example.com', role: 'admin' }),
    role: 'admin',
  },
];

@Service()
export default class UserRepository {
  createUser = async (
    firstName: string,
    email: string,
    lastName: string,
    token: string,
    role: string,
  ): Promise<User> => {
    const user = User.build({ firstName, lastName, email, token, role });
    return await user.save();
  };

  createSeedUser = async (): Promise<string> => {
    for (const item of userMockData) {
      const user = User.build(item);
      await user.save();
    }
    return 'Successfully Seeded Users!!';
  };

  findByEmail = async (email: string): Promise<User | null> => {
    return await User.findOne({ where: { email } });
  };

  getAllUsers = async (): Promise<User[]> => {
    return await User.findAll();
  };
}
