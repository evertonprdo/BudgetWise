import { UniqueEntityID } from '@/domain/core/entities/unique-entity-id'
import { ValueObject } from '@/domain/core/entities/value-objects/value-object'

import { Money } from './money'
import { AppDate } from './app-date'
import { TransactionTypes } from '../../../transactions/entities/transaction'

export interface TransactionDetailsProps {
   id: UniqueEntityID
   type: TransactionTypes
   date: AppDate
   amount: Money
   description: string
   createdAt: AppDate
   updatedAt?: AppDate | null
   category: {
      id: UniqueEntityID
      name: string
      displayName: string
      color: string
      iconKey: string
      description?: string | null
   }
}

export class TransactionDetails extends ValueObject<TransactionDetailsProps> {
   get id() {
      return this.props.id
   }

   get type() {
      return this.props.type
   }

   get date() {
      return this.props.date
   }

   get amount() {
      return this.props.amount
   }

   get description() {
      return this.props.description
   }

   get updatedAt() {
      return this.props.updatedAt
   }

   get category() {
      return this.props.category
   }

   static create(props: TransactionDetailsProps) {
      return new TransactionDetails(props)
   }
}
