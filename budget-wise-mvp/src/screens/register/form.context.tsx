import { createContext, PropsWithChildren, useContext, useState } from 'react'

import { colors } from '@/styles'
import { Calendar, IconComponent, Triangle, X } from '@/assets/icons'

import { AppMoney } from '@/utils/app-money'
import { AppDate } from '@/utils/app-date'

export type TransactionProps = {
   type?: 'income' | 'expense'
   amount?: AppMoney
   date?: AppDate
   category?: string
   description?: string
}

type ContextProps = {
   transaction: TransactionProps
   setTransactionProp: (key: keyof TransactionProps, value: any) => void
   categories: {
      name: string
      displayName: string
      icon: IconComponent
      color: string
   }[]
}

const formRegisterContext = createContext<ContextProps | null>(null)

export function FormRegisterProvider({ children }: PropsWithChildren) {
   const [transaction, setTransaction] = useState<TransactionProps>({
      type: 'expense',
   })

   function setTransactionProp(key: keyof TransactionProps, value: any) {
      setTransaction((state) => ({ ...state, [key]: value }))
   }

   return (
      <formRegisterContext.Provider
         value={{ transaction, categories, setTransactionProp }}
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
