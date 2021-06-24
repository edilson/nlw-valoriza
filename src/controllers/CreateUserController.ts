import { Request, Response } from "express";

import CreateUserService from "../services/CreateUserService";

export default class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, admin } = request.body;

    const createUserService = new CreateUserService();

    const userCreated = await createUserService.execute({
      name,
      email,
      admin,
    });

    return response.status(201).json(userCreated);
  }
}
