import { Transaction } from '../entities/transaction'
import { TransactionDetails } from '../entities/value-objects/transaction-details'

export interface TransactionsRepository {
   create(transaction: Transaction): Promise<void>
   findById(id: string): Promise<Transaction | null>
   findAll(): Promise<TransactionDetails[]>
}
