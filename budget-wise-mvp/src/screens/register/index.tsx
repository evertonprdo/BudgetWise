import { useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { colors } from '@/styles'
import { RegisterForm } from './form'
import { RegisterHeader } from './header'

import {
   FormRegisterProvider,
   TransactionFormOutput,
} from './form-context/form-register'

import { Category } from '@/domain/transactions/entities/category'
import { ListCategoriesUseCase } from '@/domain/transactions/use-cases/list-categories'
import { CreateTransactionUseCase } from '@/domain/transactions/use-cases/create-transaction.use-case'

import { useRouter } from '@/hooks/useRouter'
import { useDatabase } from '@/hooks/useDatabase'

export function Register() {
   const { navigate } = useRouter()
   const { repositories } = useDatabase()

   const [categories, setCategories] = useState<Category[]>([])

   function handleOnRequestCancel() {
      Alert.alert(
         'Canceling Registration',
         'Are you sure you want to cancel your registration? Your progress will be lost.',
         [
            { text: 'Back', style: 'cancel' },
            { text: 'Confirm', onPress: () => navigate('back') },
         ],
      )
   }

   async function handleOnSubmit(transaction: TransactionFormOutput) {
      try {
         await submitTransaction(transaction)
         Alert.alert(
            'Form',
            'Your transaction has been successfully registered!',
            [{ text: 'Go Home', onPress: () => navigate('back') }],
         )
      } catch (error) {
         Alert.alert('Form error', 'Something got wrong try again!')
      }
   }

   async function submitTransaction(transaction: TransactionFormOutput) {
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
         amount: transaction.amount.cents,
         date: transaction.date.unix,
         categoryId: category.id.toString(),
         description: transaction.description,
      })

      if (result.isLeft()) {
         throw new Error('Error creating transaction')
      }
   }

   useEffect(() => {
      const fetchCategories = async () => {
         const result = await new ListCategoriesUseCase(
            repositories.categories,
         ).execute()

         if (result.isLeft()) {
            throw new Error('Fail to fetch categories')
         }

         return result.value.categories
      }

      fetchCategories()
         .then(setCategories)
         .catch((error) => Alert.alert('Form error', error))
   }, [])

   return (
      <FormRegisterProvider
         categories={categories}
         onSubmit={handleOnSubmit}
         onRequestCancel={handleOnRequestCancel}
      >
         <SafeAreaView style={s.root}>
            <RegisterHeader onRequestCancel={handleOnRequestCancel} />

            <RegisterForm />
         </SafeAreaView>
      </FormRegisterProvider>
   )
}

const s = StyleSheet.create({
   root: {
      flex: 1,
      backgroundColor: colors.stone[200],
   },
})
