import { UniqueEntityID } from '@/domain/core/entities/unique-entity-id'

import { Transaction } from '@/domain/transactions/entities/transaction'
import { Money } from '@/domain/transactions/entities/value-objects/money'
import { AppDate } from '@/domain/transactions/entities/value-objects/app-date'

export interface SQLiteTransaction {
   id: string
   type: 'income' | 'expense'
   cents: number
   date: number
   description: string
   category_id: string
   updated_at: number | null
}

export class TransactionMapper {
   static toDomain(raw: SQLiteTransaction): Transaction {
      return Transaction.create(
         {
            amount: Money.createFromCents(raw.cents),
            categoryId: new UniqueEntityID(raw.category_id),
            date: AppDate.createFromUnixTimestamp(raw.date),
            description: raw.description,
            type: raw.type,
            updatedAt: raw.updated_at
               ? AppDate.createFromUnixTimestamp(raw.updated_at)
               : null,
         },
         new UniqueEntityID(raw.id),
      )
   }

   static toSQLite(transaction: Transaction): SQLiteTransaction {
      return {
         id: transaction.id.toString(),
         type: transaction.type,
         date: transaction.date.unix,
         cents: transaction.amount.cents,
         description: transaction.description,
         category_id: transaction.categoryId.toString(),
         updated_at: transaction.updatedAt?.unix ?? null,
      }
   }
}
