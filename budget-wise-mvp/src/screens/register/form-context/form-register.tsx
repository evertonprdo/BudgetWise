import { createContext, useState } from 'react'
import { Alert } from 'react-native'

import { colors } from '@/styles'
import { Calendar, IconComponent, Triangle, X } from '@/assets/icons'

import { StepValue } from '../form/steps/type-amount'
import { StepDetails } from '../form/steps/details'

import { AppDate } from '@/utils/app-date'
import { AppMoney } from '@/utils/app-money'
import { isValidAmount, isValidDescription } from './validate'

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

   categories: {
      name: string
      displayName: string
      icon: IconComponent
      color: string
   }[]
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
   const [currentStep, setCurrentStep] = useState<FORM_STEPS>(0)
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

   function handleRight() {
      switch (currentStep) {
         case FORM_STEPS.TYPE_AND_AMOUNT:
            if (transaction.amount && isValidAmount(transaction.amount)) {
               return setCurrentStep(FORM_STEPS.DETAILS)
            }
            return showWrongFieldAlert('The amount must be greater than zero')
         case FORM_STEPS.DETAILS:
            if (
               transaction.description &&
               isValidDescription(transaction.description)
            ) {
               return submitTransaction()
            }
            return showWrongFieldAlert(
               'The description must have a minimum of 3 characters and a maximum of 500',
            )
      }
   }

   function showWrongFieldAlert(message: string) {
      Alert.alert('Form error', message)
   }

   function submitTransaction() {
      console.log(transaction)
      Alert.alert(
         'Form',
         'Your transaction has been successfully registered!',
         [{ text: 'Go Home', onPress: onSubmit }],
      )
   }

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

const categories = [
   {
      name: 'category',
      displayName: 'Category',
      icon: Triangle,
      color: colors.green[500],
   },
   {
      name: 'other-category',
      displayName: 'Other Category',
      color: colors.emerald[500],
      icon: Calendar,
   },
   {
      name: 'another-category',
      displayName: 'Another Category',
      color: colors.red[500],
      icon: X,
   },
]
