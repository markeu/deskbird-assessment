import User from '../src/models/User';
import UserService from '../src/services/UserService';
import { LoggerClient } from '../src/services/LoggerClient';
import UserRepository from '../src/repositories/UserRepository';

jest.mock('../src/services/LoggerClient');
jest.mock('../src/repositories/UserRepository');

describe('UserService', () => {
  let userService: UserService;
  let loggerClientMock: jest.Mocked<LoggerClient>;
  let userRepositoryMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepositoryMock = new UserRepository() as jest.Mocked<UserRepository>;
    loggerClientMock = new LoggerClient() as jest.Mocked<LoggerClient>;
    userService = new UserService(userRepositoryMock, loggerClientMock);
  });

  it('signUp should call userRepository.createUser and return the result', async () => {
    const firstName = 'John';
    const email = 'john@example.com';
    const lastName = 'Doe';
    const token = 'abc123';
    const role = 'user';
  
    const expectedResult = {
      id: 1,
      firstName,
      email,
      lastName,
      role,
      token,
    } as User;
  
  
    userRepositoryMock.createUser = jest.fn().mockResolvedValue(expectedResult);
   
    const result = await userService.signUp(firstName, email, lastName, token, role);
  
    expect(userRepositoryMock.createUser).toHaveBeenCalledWith(lastName, firstName, email, role, token);
    expect(result).toEqual(expectedResult);
  });
  
  

  it('seedUsers should call userRepository.createSeedUser and return the result', async () => {
  
    userRepositoryMock.createSeedUser = jest.fn().mockResolvedValue("Successfully Seeded Users!!");
    const result = await userService.seedUsers();

    expect(userRepositoryMock.createSeedUser).toHaveBeenCalled();
    expect(result).toEqual("Successfully Seeded Users!!");
  });


  it('getAllUsers should call userRepository.getAllUsers and return the result', async () => {
    const expectedResult = [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqb2huZG9lQGV4YW1wbGUuY29tIiwicm9sZSI6InN0YW5kYXJkIiwiaWF0IjoxNTE2MjM5MDIyfQ.rXMPkokvfDyY6lDU_42dDinmvDJ5grkkZcoSk9nepEs',
      role: 'standard'
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'janesmith@example.com',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqYW5lc21pdGhAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MTYyMzkwMjJ9.J9ZmU4AnEEAvDfvyinLRoOghBvbRfYj6UcwvKGJQW4Y',
      role: 'admin'
    }] ;
  
    userRepositoryMock.getAllUsers = jest.fn().mockResolvedValue(expectedResult);
  
    const result = await userService.getAllUsers();
  
    expect(userRepositoryMock.getAllUsers).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });
});
