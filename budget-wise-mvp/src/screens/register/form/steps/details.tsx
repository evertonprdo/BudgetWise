import { useMemo } from 'react'
import { Text, View } from 'react-native'

import { styles } from './styles'
import { CategoryIcons } from '@/assets/icons/categories'
import { OptionProps } from '@/components/ui/select'
import { InputArea, InputDate, Select } from '@/components/ui'

import { Empty } from '@/assets/icons'
import { AppDate } from '@/utils/app-date'
import { useFormRegister } from '../../form-context/form-register'

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

   const options = useMemo(() => {
      return categories.map<OptionProps>((category) => ({
         name: category.name.value,
         color: category.color,
         displayName: category.displayName,
         icon: CategoryIcons[
            category.iconKey as keyof typeof CategoryIcons
         ] ?? <Empty />,
      }))
   }, [categories])

   return (
      <>
         <Text style={styles.title}>Enter the transaction details</Text>

         <View style={styles.iptWrapper}>
            <Text style={styles.label}>Category</Text>
            <Select
               options={options}
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
