import { Text, View } from 'react-native'

import { styles } from './styles'
import { InputCurrency } from '@/components/ui'
import { SwitchTransactionType } from '@/components/switch-transaction-type'

import { AppMoney } from '@/utils/app-money'
import { useFormRegister } from '../../form-context/form-register'

export function StepValue() {
   const { transaction, setTransactionProp } = useFormRegister()

   function handleOnInputCurrencyChange(number: number) {
      setTransactionProp('amount', AppMoney.createFromCents(number))
   }

   function handleOnTypeChange(value: 'income' | 'expense') {
      setTransactionProp('type', value)
   }

   return (
      <>
         <Text style={styles.title}>Enter the transaction type and amount</Text>

         <View style={styles.iptWrapper}>
            <Text style={styles.label}>Amount</Text>
            <InputCurrency
               cents={transaction.amount?.cents ?? null}
               onChangeNumber={handleOnInputCurrencyChange}
            />
         </View>

         <View style={styles.iptWrapper}>
            <Text style={styles.label}>Type</Text>
            <SwitchTransactionType
               variant={transaction.type!}
               onValueChange={handleOnTypeChange}
            />
         </View>
      </>
   )
}
