import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { colors, fonts } from '@/styles'
import { useDB } from '@/contexts/db-context'
import { Button } from '@/components/ui'
import { useNavigate } from '@/contexts/router.context'

import {
   TransactionItem,
   TransactionProps,
} from '@/components/transaction-item'

import { Empty } from '@/assets/icons'
import { CategoryIcons } from '@/assets/icons/categories'

import { ListTransactionsUseCase } from '@/core/use-cases/list-transactions.use-case'

export function Index() {
   const { repositories } = useDB()
   const { navigate } = useNavigate()

   const [transactions, setTransactions] = useState<TransactionProps[]>([])

   async function listTransactions() {
      const result = await new ListTransactionsUseCase(
         repositories.transactions,
      ).execute()

      if (result.isLeft()) {
         throw new Error('Fail to list transactions')
      }

      setTransactions(
         result.value.transactions.map<TransactionProps>((item) => ({
            type: item.type,
            amount: item.amount.toCurrency(),
            date: item.date.toShortDate(),
            description: item.description,
            category: {
               color: item.category.color,
               icon:
                  CategoryIcons[
                     item.category.iconKey as keyof typeof CategoryIcons
                  ] ?? Empty,
            },
         })),
      )
   }

   useEffect(() => {
      listTransactions()
   }, [navigate])

   return (
      <SafeAreaView style={s.root}>
         <Text style={s.title}>Budget Wise</Text>
         <FlatList
            data={transactions}
            renderItem={({ item }) => <TransactionItem transaction={item} />}
            style={s.scrollView}
            contentContainerStyle={s.container}
         />

         <Button
            onPress={() => navigate('register')}
            style={s.footer}
         >
            Register Transaction
         </Button>
      </SafeAreaView>
   )
}

const s = StyleSheet.create({
   root: {
      flex: 1,
      backgroundColor: colors.stone[50],
   },
   title: {
      fontFamily: fonts.family.bold,
      fontSize: fonts.size.xl,
      color: colors.stone[800],
      textAlign: 'center',
      marginVertical: 16,
   },
   scrollView: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.stone[200],
      borderColor: colors.stone[300],
      borderTopWidth: 2,
      borderBottomWidth: 2,
   },
   container: {
      flexGrow: 1,
      gap: 16,
      paddingBottom: 200,
   },
   footer: {
      margin: 24,
   },
})
