import { createContext, useContext, useState } from 'react'
import { Alert } from 'react-native'

import { isValidAmount, isValidDescription } from './validate'

import { Category } from '@/domain/transactions/entities/category'

import { AppDate } from '@/utils/app-date'
import { AppMoney } from '@/utils/app-money'

export interface TransactionFormOutput {
   type: 'income' | 'expense'
   amount: AppMoney
   date: AppDate
   category: string
   description: string
}

export type TransactionContextProps = Partial<TransactionFormOutput>

type ContextProps = {
   transaction: TransactionContextProps
   setTransactionProp: <T extends keyof TransactionContextProps>(
      key: T,
      value: TransactionContextProps[T],
   ) => void

   currentStep: FORM_STEPS
   stepsLength: number

   stepLeft: () => void
   stepRight: () => void

   categories: Category[]
}

type ProviderProps = {
   transaction?: TransactionContextProps
   categories: Category[]
   children: React.ReactNode
   onRequestCancel: () => void
   onSubmit: (transaction: TransactionFormOutput) => void
}

export const enum FORM_STEPS {
   TYPE_AND_AMOUNT,
   DETAILS,
}

export const formRegisterContext = createContext<ContextProps | null>(null)

export function FormRegisterProvider({
   children,
   onSubmit,
   onRequestCancel,
   transaction: initialTransaction,
   categories,
}: ProviderProps) {
   const [currentStep, setCurrentStep] = useState<FORM_STEPS>(0)

   const [transaction, setTransaction] = useState<TransactionContextProps>(
      initialTransaction ?? {
         type: 'expense',
      },
   )

   function setTransactionProp<T extends keyof TransactionContextProps>(
      key: T,
      value: TransactionContextProps[T],
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
               return onSubmit(transaction as TransactionFormOutput)
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

   return (
      <formRegisterContext.Provider
         value={{
            transaction,
            categories,
            setTransactionProp,
            currentStep,
            stepsLength: FORM_STEPS.DETAILS,
            stepLeft: handleLeft,
            stepRight: handleRight,
         }}
      >
         {children}
      </formRegisterContext.Provider>
   )
}

export function useFormRegister() {
   const hook = useContext(formRegisterContext)

   if (hook === null) {
      throw new Error('Wrap with <FormRegisterProvider/>')
   }

   return hook
}
