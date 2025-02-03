import { Either, right } from '@/domain/core/either'

import { TransactionDetails } from '../entities/value-objects/transaction-details'
import { TransactionsRepository } from '../repositories/transactions.repository'

// interface ListTransactionsUseCaseRequest {}

type ListTransactionsUseCaseResponse = Either<
   null,
   { transactions: TransactionDetails[] }
>

export class ListTransactionsUseCase {
   constructor(private transactionsRepository: TransactionsRepository) {}

   async execute(): Promise<ListTransactionsUseCaseResponse> {
      const transactions = await this.transactionsRepository.findAll()

      return right({ transactions })
   }
}
