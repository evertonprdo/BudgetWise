import { StyleSheet, Text, View } from 'react-native'

import { Empty, X } from '@/assets/icons'
import { CategoryIcons } from '@/assets/icons/categories'

import { colors, fonts, opacity, sizes } from '@/styles'
import { TransactionItem } from '@/components/transaction-item'
import { useFormRegister } from './form-context/form-register'

type Props = {
   onRequestCancel: () => void
}

export function RegisterHeader({ onRequestCancel }: Props) {
   const { categories, transaction, currentStep, FormSteps } = useFormRegister()

   const currentCategory = categories.find(
      ({ name }) => transaction.category === name.value,
   )

   const currentIcon = currentCategory
      ? {
           color: currentCategory.color,
           icon:
              CategoryIcons[
                 currentCategory.iconKey as keyof typeof CategoryIcons
              ] ?? Empty,
        }
      : { color: '', icon: Empty }

   return (
      <View style={s.container}>
         <View style={s.options}>
            <Text style={s.title}>Register Transaction</Text>
            <X
               onPress={onRequestCancel}
               color={colors.stone[800]}
            />
         </View>

         <View style={s.header}>
            <TransactionItem
               transaction={{
                  type: transaction.type,
                  amount: transaction.amount?.toCurrency() ?? '',
                  category: currentIcon,
                  date: transaction.date?.toShortDate() ?? '',
                  description: transaction.description ?? '',
               }}
            />
            <View style={s.steps}>
               {FormSteps.map((_, i) => (
                  <View
                     key={i}
                     style={
                        currentStep === i ? stepFocusedStyle : stepBlurStyle
                     }
                  />
               ))}
            </View>
         </View>
      </View>
   )
}

const s = StyleSheet.create({
   container: {
      gap: 16,
      paddingHorizontal: 16,
      paddingVertical: 24,
   },

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
   stepFocus: { backgroundColor: colors.emerald[500] },
   stepBlur: { backgroundColor: `${colors.emerald[500]}${opacity[30]}` },
})

const stepFocusedStyle = StyleSheet.compose(s.step, s.stepFocus)
const stepBlurStyle = StyleSheet.compose(s.step, s.stepBlur)
