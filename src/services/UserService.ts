import { ApplicationError } from '../utils/ApiError';
import { Service } from 'typedi';
import UserRepository from '../repositories/UserRepository';
import { LoggerClient } from './LoggerClient';



@Service()
export default class UserService {
  constructor(public userRepository: UserRepository, public logger: LoggerClient) {}

  signUp = async (firstName: string, email: string, lastName: string, token: string, role: string) => {
    const result = this.userRepository.createUser(lastName, firstName, email, role, token);
    return result;
  };

  seedUsers = async() => {
    const result = this.userRepository.createSeedUser();
    return result;
  }

  // signIn = async (email: string, password: string) => {
  //   this.logger.info(`Email of the registered user is ${email}`);
  //   const userWithEmail: User | null = await this.userRepository.findByEmail(email);
  //   if (!userWithEmail) {
  //     throw new ApplicationError('No User found with this email');
  //   }
  //   if (userWithEmail.password.toString() !== password) {
  //     throw new ApplicationError('Password did not match');
  //   }
  //   return 'Successfully Signed In';
  // };

  getAllUsers = async () => {
    return await this.userRepository.getAllUsers();
  };
}
