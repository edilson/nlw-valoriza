import { Request, Response } from "express";

import CreateTagService from "../services/CreateTagService";

export default class CreateTagController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const createTagService = new CreateTagService();

    const { name } = request.body;

    const tagCreated = await createTagService.execute({
      name,
    });

    return response.status(201).json(tagCreated);
  }
}
