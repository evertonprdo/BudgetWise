import { Text, View } from 'react-native'

import { styles } from './styles'
import { InputArea, InputDate, Select } from '@/components/ui'
import { useFormRegister } from '../../form-context/use-form-register'

import { AppDate } from '@/utils/app-date'

export function StepDetails() {
   const { transaction, categories, setTransactionProp } = useFormRegister()

   function handleOnCategoryChange(name: string) {
      setTransactionProp('category', name)
   }

   function handleOnChangeSelectedDate(date: AppDate) {
      setTransactionProp('date', date)
   }

   function handleOnChangeDescription(text: string) {
      setTransactionProp('description', text)
   }

   return (
      <>
         <Text style={styles.title}>Enter the transaction details</Text>

         <View style={styles.iptWrapper}>
            <Text style={styles.label}>Category</Text>
            <Select
               options={categories}
               selected={transaction.category}
               onChangeSelected={handleOnCategoryChange}
            />
         </View>

         <View style={styles.iptWrapper}>
            <Text style={styles.label}>Date</Text>
            <InputDate
               appDate={transaction.date}
               onDateChange={handleOnChangeSelectedDate}
            />
         </View>

         <View style={styles.iptWrapper}>
            <Text style={styles.label}>Description</Text>
            <InputArea
               value={transaction.description}
               onChangeText={handleOnChangeDescription}
            />
         </View>
      </>
   )
}
