import { createContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'

import { StepValue } from '../form/steps/type-amount'
import { StepDetails } from '../form/steps/details'

import { useDB } from '@/contexts/db-context'
import { isValidAmount, isValidDescription } from './validate'

import { Category } from '@/core/entities/category'
import { ListCategoriesUseCase } from '@/core/use-cases/list-categories'

import { AppDate } from '@/utils/app-date'
import { AppMoney } from '@/utils/app-money'
import { CreateTransactionUseCase } from '@/core/use-cases/create-transaction.use-case'

export type TransactionProps = {
   type: 'income' | 'expense'
   amount?: AppMoney
   date?: AppDate
   category?: string
   description?: string
}

type ContextProps = {
   transaction: TransactionProps
   setTransactionProp: <T extends keyof TransactionProps>(
      key: T,
      value: TransactionProps[T],
   ) => void

   currentStep: FORM_STEPS
   FormSteps: Array<() => React.JSX.Element>

   stepLeft: () => void
   stepRight: () => void

   categories: Category[]
}

type ProviderProps = {
   transaction?: TransactionProps
   children: React.ReactNode
   onSubmit: () => void
   onRequestCancel: () => void
}

export enum FORM_STEPS {
   TYPE_AND_AMOUNT,
   DETAILS,
}

export const formRegisterContext = createContext<ContextProps | null>(null)

const FormSteps = [StepValue, StepDetails]

export function FormRegisterProvider({
   children,
   onSubmit,
   onRequestCancel,
   transaction: initialTransaction,
}: ProviderProps) {
   const { repositories } = useDB()

   const [currentStep, setCurrentStep] = useState<FORM_STEPS>(0)

   const [categories, setCategories] = useState<Category[]>([])
   const [transaction, setTransaction] = useState<TransactionProps>(
      initialTransaction ?? {
         type: 'expense',
      },
   )

   function setTransactionProp<T extends keyof TransactionProps>(
      key: T,
      value: TransactionProps[T],
   ) {
      setTransaction((state) => ({ ...state, [key]: value }))
   }

   function handleLeft() {
      switch (currentStep) {
         case FORM_STEPS.TYPE_AND_AMOUNT:
            onRequestCancel()
            break
         case FORM_STEPS.DETAILS:
            setCurrentStep(FORM_STEPS.TYPE_AND_AMOUNT)
            break
      }
   }

   async function handleRight() {
      switch (currentStep) {
         case FORM_STEPS.TYPE_AND_AMOUNT:
            if (transaction.amount && isValidAmount(transaction.amount)) {
               return setCurrentStep(FORM_STEPS.DETAILS)
            }
            return showWrongFieldAlert('The amount must be greater than zero')
         case FORM_STEPS.DETAILS:
            if (
               transaction.description &&
               transaction.category &&
               isValidDescription(transaction.description)
            ) {
               return await submitTransaction()
            }
            return showWrongFieldAlert(
               !transaction.category
                  ? 'Please select category'
                  : 'The description must have a minimum of 3 characters and a maximum of 500',
            )
      }
   }

   function showWrongFieldAlert(message: string) {
      Alert.alert('Form error', message)
   }

   async function submitTransaction() {
      try {
         const category = categories.find(
            (cat) => cat.name.value === transaction.category,
         )

         if (!category) {
            throw new Error()
         }

         const result = await new CreateTransactionUseCase(
            repositories.transactions,
            repositories.categories,
         ).execute({
            type: transaction.type,
            amount: transaction.amount!.cents,
            date: transaction.date!.unix,
            categoryId: category.id.toString(),
            description: transaction.description!,
         })

         if (result.isLeft()) {
            throw new Error()
         }

         Alert.alert(
            'Form',
            'Your transaction has been successfully registered!',
            [{ text: 'Go Home', onPress: onSubmit }],
         )
      } catch (error) {
         Alert.alert('Form error', 'Something got wrong try again!')
         throw error
      }
   }

   async function fetchCategories() {
      const result = await new ListCategoriesUseCase(
         repositories.categories,
      ).execute()

      if (result.isLeft()) {
         throw new Error('Fail to fetch categories')
      }

      setCategories(result.value.categories)
   }

   useEffect(() => {
      fetchCategories()
   }, [])

   return (
      <formRegisterContext.Provider
         value={{
            transaction,
            categories,
            setTransactionProp,
            currentStep,
            FormSteps,
            stepLeft: handleLeft,
            stepRight: handleRight,
         }}
      >
         {children}
      </formRegisterContext.Provider>
   )
}
