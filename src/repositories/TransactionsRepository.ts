import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const getBalance = await this.find();

    const income = getBalance
      .filter(transaction => transaction.type === 'income')
      .reduce((acumulator, transaction) => acumulator + transaction.value, 0);

    const outcome = getBalance
      .filter(transaction => transaction.type === 'outcome')
      .reduce((acumulator, transaction) => acumulator + transaction.value, 0);

    return {
      outcome,
      income,
      total: income - outcome,
    };
  }
}

export default TransactionsRepository;
