import { Transaction } from '@/domain/transactions/entities/transaction'
import { TransactionsRepository } from '@/domain/transactions/repositories/transactions.repository'

import { Database } from '../database'

import { TransactionMapper } from '../mappers/transaction.mapper'
import {
   SQLiteTransactionDetails,
   TransactionDetailsMapper,
} from '../mappers/transaction-details.mapper'

export class SQLiteTransactionsRepository implements TransactionsRepository {
   public readonly tableName = 'transactions'

   constructor(private db: Database) {}

   async create(transaction: Transaction) {
      const {
         id,
         type,
         cents,
         date,
         description,
         category_id,
         created_at,
         updated_at,
      } = TransactionMapper.toSQLite(transaction)

      await this.db.conn.runAsync(
         `
            INSERT INTO ${this.tableName} (id, type, cents, date, description, category_id, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         `,
         [
            id,
            type,
            cents,
            date,
            description,
            category_id,
            created_at,
            updated_at,
         ],
      )
   }

   findById(id: string): Promise<Transaction | null> {
      throw new Error('Method not implemented.')
   }

   async findAll() {
      const transactions = await this.db.conn
         .getAllAsync<SQLiteTransactionDetails>(`
         SELECT t.id AS transaction_id,
                t.type,
                t.cents,
                t.date,
                t.description AS transaction_description,
                t.updated_at,
                t.created_at,
                c.id AS category_id,
                c.name AS category_name,
                c.display_name,
                c.color,
                c.icon_key,
                c.description AS category_description
         FROM ${this.tableName} AS t
         JOIN categories AS c ON t.category_id = c.id
         ORDER BY t.date DESC, t.created_at DESC;
      `)

      return transactions.map(TransactionDetailsMapper.toDomain)
   }
}
