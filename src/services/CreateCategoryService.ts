import { getRepository } from 'typeorm';

import Category from '../models/Category';
// import AppError from '../errors/AppError';

class CreateTransactionService {
  public async execute(title: string): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    // const existsCategory = await categoriesRepository.createQueryBuilder().where({ title })
    const existsCategory = await categoriesRepository.findOne({
      where: { title },
    });

    if (!existsCategory) {
      const category = await categoriesRepository.save({ title });
      return category;
    }

    return existsCategory;
  }
}

export default CreateTransactionService;
