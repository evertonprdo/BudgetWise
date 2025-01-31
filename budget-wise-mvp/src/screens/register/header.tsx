import { StyleSheet, Text, View } from 'react-native'

import { X } from '@/assets/icons'
import { colors, fonts, opacity, sizes } from '@/styles'
import { TransactionItem } from '@/components/transaction-item'

import { useFormRegister } from './form.context'

type Props = {
   currentStep: number
}

export function RegisterHeader({ currentStep }: Props) {
   const { transaction, categories } = useFormRegister()
   const currentCategory = categories.find(
      ({ name }) => transaction.category === name,
   ) ?? { color: '', icon: () => null as any }

   const stepOneStyle = StyleSheet.flatten([
      s.step,
      {
         backgroundColor: stepFocusBgColor[currentStep === 0 ? 0 : 1],
      },
   ])
   const stepTwoStyle = StyleSheet.flatten([
      s.step,
      {
         backgroundColor: stepFocusBgColor[currentStep === 1 ? 0 : 1],
      },
   ])

   return (
      <View style={s.container}>
         <View style={s.options}>
            <Text style={s.title}>Register Transaction</Text>
            <X color={colors.stone[800]} />
         </View>

         <View style={s.header}>
            <TransactionItem
               type={transaction.type ?? 'expense'}
               amount={transaction.amount?.toCurrency() ?? ''}
               category={currentCategory}
               date={transaction.date?.toShortDate() ?? ''}
               description={transaction.description ?? ''}
            />
            <View style={s.steps}>
               <View style={stepOneStyle} />
               <View style={stepTwoStyle} />
            </View>
         </View>
      </View>
   )
}

const stepFocusBgColor = [
   colors.emerald[500],
   `${colors.emerald[500]}${opacity[30]}`,
]

const s = StyleSheet.create({
   container: { gap: 8, padding: 16 },
   options: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   title: {
      fontFamily: fonts.family.medium,
      fontSize: fonts.size.md,
      color: colors.stone[800],
   },
   header: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: sizes.radius.md,
      paddingBottom: 4,
   },
   steps: {
      bottom: 0,
      position: 'absolute',
      flexDirection: 'row',
      zIndex: 1,
   },
   step: {
      flex: 1,
      height: 8,
   },
})
