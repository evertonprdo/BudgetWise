import { Either, left, right } from '../either'

import { Transaction } from '../entities/transaction'
import { Money } from '../entities/value-objects/money'
import { AppDate } from '../entities/value-objects/app-date'

import { CategoriesRepository } from '../repositories/categories.repository'
import { TransactionsRepository } from '../repositories/transactions.repository'

interface CreateTransactionUseCaseRequest {
   type: 'income' | 'expense'
   date: number
   amount: number
   categoryId: string
   description: string
}

type CreateTransactionUseCaseResponse = Either<string, null>

export class CreateTransactionUseCase {
   constructor(
      private transactionsRepository: TransactionsRepository,
      private categoriesRepository: CategoriesRepository,
   ) {}

   async execute({
      type,
      date,
      amount,
      categoryId,
      description,
   }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
      const category = await this.categoriesRepository.findById(categoryId)

      if (!category) {
         return left('Resource Not found')
      }

      const transaction = Transaction.create({
         type,
         categoryId: category.id,
         description,
         amount: Money.createFromCents(amount),
         date: AppDate.createFromUnixTimestamp(date),
      })

      this.transactionsRepository.create(transaction)

      return right(null)
   }
}
