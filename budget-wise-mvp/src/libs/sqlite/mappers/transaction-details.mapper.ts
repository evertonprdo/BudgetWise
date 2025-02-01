import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Money } from '@/core/entities/value-objects/money'
import { AppDate } from '@/core/entities/value-objects/app-date'

import { TransactionTypes } from '@/core/entities/transaction'
import { TransactionDetails } from '@/core/entities/value-objects/transaction-details'

export interface SQLiteTransactionDetails {
   transaction_id: string
   type: TransactionTypes
   cents: number
   date: number
   transaction_description: string
   category_id: string
   category_name: string
   display_name: string
   color: string
   icon_key: string
   category_description: string | null
   updated_at: number | null
}

export class TransactionDetailsMapper {
   static toDomain(raw: SQLiteTransactionDetails): TransactionDetails {
      return TransactionDetails.create({
         id: new UniqueEntityID(raw.transaction_id),
         type: raw.type,
         amount: Money.createFromCents(raw.cents),
         date: AppDate.createFromUnixTimestamp(raw.date),
         description: raw.transaction_description,
         updatedAt: raw.updated_at
            ? AppDate.createFromUnixTimestamp(raw.updated_at)
            : null,

         category: {
            id: new UniqueEntityID(raw.category_id),
            color: raw.color,
            displayName: raw.display_name,
            iconKey: raw.icon_key,
            name: raw.category_name,
            description: raw.category_description,
         },
      })
   }
}
