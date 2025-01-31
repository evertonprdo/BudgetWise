import { StyleSheet, Text, View } from 'react-native'

import { colors, fonts } from '@/styles'
import { InputCurrency } from '@/components/ui'
import { SwitchTransactionType } from '@/components/switch-transaction-type'
import { useFormRegister } from '../form.context'

import { AppMoney } from '@/utils/app-money'

export function StepValue() {
   const { transaction, setTransactionProp } = useFormRegister()

   function handleOnInputCurrencyChange(number: number) {
      setTransactionProp('amount', AppMoney.createFromCents(number))
   }

   function handleOnTypeChange(value: 'income' | 'expense') {
      setTransactionProp('type', value)
   }

   return (
      <View style={s.container}>
         <Text style={s.title}>Enter the transaction type and amount</Text>

         <View style={s.iptWrapper}>
            <Text style={s.label}>Amount</Text>
            <InputCurrency
               cents={transaction.amount?.cents ?? null}
               onChangeNumber={handleOnInputCurrencyChange}
            />
         </View>

         <View style={s.iptWrapper}>
            <Text style={s.label}>Type</Text>
            <SwitchTransactionType
               variant={transaction.type ?? 'expense'}
               onValueChange={handleOnTypeChange}
            />
         </View>
      </View>
   )
}

const s = StyleSheet.create({
   container: {
      gap: 16,
   },

   title: {
      color: colors.stone[800],
      fontSize: fonts.size.lg,
      fontFamily: fonts.family.semiBold,
   },

   iptWrapper: {
      gap: 32,
   },

   label: {
      color: colors.stone[500],
      fontSize: fonts.size.sm,
      fontFamily: fonts.family.medium,
   },
})
