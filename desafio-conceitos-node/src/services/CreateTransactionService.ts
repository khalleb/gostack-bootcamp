import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';


interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    if(type ==='outcome' && total < value){
      throw Error('O valor de retirada nao pode ser maior que o valor atual do caixa');
    }
    const appointment = this.transactionsRepository.create({ title, value, type });
    return appointment;
  }
}

export default CreateTransactionService;
