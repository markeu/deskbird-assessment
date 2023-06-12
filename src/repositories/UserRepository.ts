import User from '../models/User';
import { Service } from 'typedi';

const userMockData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqb2huZG9lQGV4YW1wbGUuY29tIiwicm9sZSI6InN0YW5kYXJkIiwiaWF0IjoxNTE2MjM5MDIyfQ.rXMPkokvfDyY6lDU_42dDinmvDJ5grkkZcoSk9nepEs',
    role: 'standard',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'janesmith@example.com',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqYW5lc21pdGhAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MTYyMzkwMjJ9.J9ZmU4AnEEAvDfvyinLRoOghBvbRfYj6UcwvKGJQW4Y',
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
