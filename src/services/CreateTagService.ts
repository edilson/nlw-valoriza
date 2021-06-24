import { getCustomRepository } from "typeorm";

import TagsRepository from "../repositories/TagsRepository";

import Tag from "../entities/Tag";

interface IRequest {
  name: string;
}

export default class CreateTagService {
  public async execute({ name }: IRequest): Promise<Tag> {
    const tagsRepository = getCustomRepository(TagsRepository);

    if (!name) {
      throw new Error("Incorrect name!");
    }

    const tagAlreadyExists = await tagsRepository.findOne({ where: { name } });

    if (tagAlreadyExists) {
      throw new Error("Tag with this name already exists!");
    }

    const tag = tagsRepository.create({
      name,
    });

    await tagsRepository.save(tag);

    return tag;
  }
}
