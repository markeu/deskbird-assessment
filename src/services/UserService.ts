import { Service } from 'typedi';

import UserRepository from '../repositories/UserRepository';
import { LoggerClient } from './LoggerClient';

@Service()
export default class UserService {
  constructor(public userRepository: UserRepository, public logger: LoggerClient) {}

  signUp = async (firstName: string, email: string, lastName: string, token: string, role: string) => {
    const result = await this.userRepository.createUser(lastName, firstName, email, role, token);
    return result;
  };

  seedUsers = async () => {
    const result = await this.userRepository.createSeedUser();
    return result;
  };

  getAllUsers = async () => {
    const result = await this.userRepository.getAllUsers();
    return result;
  };
}
