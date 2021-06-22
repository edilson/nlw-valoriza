import { getCustomRepository } from "typeorm";
import UsersRepository from "../repositories/UsersRepository";

import User from "../entities/User";

interface IUserRequest {
  name: string;
  email: string;
  admin: boolean;
}

export default class CreateUserService {
  public async execute({ name, admin, email }: IUserRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!email) {
      throw new Error("Incorrect email");
    }

    const userAlreadyExists = await usersRepository.findOne({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const userCreated = usersRepository.create({
      name,
      email,
      admin,
    });

    await usersRepository.save(userCreated);

    return userCreated;
  }
}
