import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { colors, fonts } from '@/styles'
import { InputArea, InputDate, Select } from '@/components/ui'
import { useFormRegister } from '../form.context'
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
      <ScrollView
         style={s.container}
         showsVerticalScrollIndicator={false}
      >
         <Text style={s.title}>Enter the transaction details</Text>

         <View style={s.iptWrapper}>
            <Text style={s.label}>Category</Text>
            <Select
               options={categories}
               selected={transaction.category ?? null}
               onChangeSelected={handleOnCategoryChange}
            />
         </View>

         <View style={s.iptWrapper}>
            <Text style={s.label}>Date</Text>
            <InputDate
               appDate={transaction.date ?? null}
               onDateChange={handleOnChangeSelectedDate}
            />
         </View>

         <View style={s.iptWrapper}>
            <Text style={s.label}>Description</Text>
            <InputArea
               value={transaction.description}
               onChangeText={handleOnChangeDescription}
            />
         </View>
      </ScrollView>
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
      marginBottom: 32,
   },

   iptWrapper: {
      marginBottom: 32,
      gap: 16,
   },

   label: {
      color: colors.stone[500],
      fontSize: fonts.size.sm,
      fontFamily: fonts.family.medium,
   },
})
