import { getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface ITransaction {
  title: string;
  value: number;
  type: 'outcome' | 'income';
  category_id: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category_id,
  }: ITransaction): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    if (type.toLowerCase() === 'outcome') {
      const balance = await transactionsRepository.getBalance();

      const valueIsValid = balance.total - value;

      if (valueIsValid < 0) {
        throw new AppError('Not enough balance to make the transaction', 400);
      }
    }

    const transaction = await transactionsRepository.save({
      title,
      value,
      type,
      category_id,
    });

    return transaction;
  }
}

export default CreateTransactionService;
