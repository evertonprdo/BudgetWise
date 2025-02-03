import { Entity } from '../../core/entities/entity'
import { UniqueEntityID } from '../../core/entities/unique-entity-id'

import { Money } from './value-objects/money'
import { AppDate } from './value-objects/app-date'

export type TransactionTypes = 'income' | 'expense'

export interface TransactionProps {
   type: TransactionTypes
   date: AppDate
   amount: Money
   categoryId: UniqueEntityID
   description: string
   updatedAt?: AppDate | null
}

export class Transaction extends Entity<TransactionProps> {
   get type() {
      return this.props.type
   }

   get date() {
      return this.props.date
   }

   get amount() {
      return this.props.amount
   }

   get categoryId() {
      return this.props.categoryId
   }

   get description() {
      return this.props.description
   }

   get updatedAt() {
      return this.props.updatedAt
   }

   set type(type: TransactionTypes) {
      this.props.type = type
      this.touch()
   }

   set date(date: AppDate) {
      this.props.date = date
      this.touch()
   }

   set amount(amount: Money) {
      this.props.amount = amount
      this.touch()
   }

   set categoryId(categoryId: UniqueEntityID) {
      this.props.categoryId = categoryId
      this.touch()
   }

   set description(description: string) {
      this.props.description = description
      this.touch()
   }

   private touch() {
      this.props.updatedAt = AppDate.create(new Date())
   }

   static create(props: TransactionProps, id?: UniqueEntityID) {
      return new Transaction(props, id)
   }
}
