import { useEffect, useState } from 'react'
import {
   Text,
   View,
   Modal,
   Animated,
   Pressable,
   StyleSheet,
   useAnimatedValue,
   ViewStyle,
} from 'react-native'

import { colors, fonts, sizes } from '@/styles'
import { FocusableBox } from '../focusable-box'
import { NumericKeyboard } from './custom-keyboard'

import { l10n } from '@/libs/localization'
import { AppMoney } from '@/utils/app-money'
import { useNumericKeyboard } from '@/contexts/numeric-keyboard'

type Props = {
   value?: number | null
   onChangeNumber?: (value: number) => void
   style?: ViewStyle
}

export function InputCurrency({ value, onChangeNumber, style }: Props) {
   const { visible, hideKeyboard, showKeyboard } = useNumericKeyboard()

   const openModal = () => showKeyboard()
   const closeModal = () => hideKeyboard()

   function handleOnKeyPress(key: string) {
      if (!onChangeNumber) return
      if (key === 'backspace' && !value) return
      if (key === 'confirm') return closeModal()

      if (key === 'backspace') {
         const strValue = value!.toString()
         const prevNum = Number(strValue.substring(0, strValue.length - 1))
         return onChangeNumber(prevNum)
      }

      const number = Number(value ? `${value}${key}` : key)
      if (number >= Number.MAX_SAFE_INTEGER) return

      onChangeNumber(number)
   }

   const blinkAnim = useAnimatedValue(0)
   useEffect(() => {
      const loop = Animated.loop(
         Animated.sequence([
            Animated.timing(blinkAnim, {
               toValue: 1,
               delay: 500,
               duration: 0,
               useNativeDriver: true,
            }),
            Animated.timing(blinkAnim, {
               toValue: 0,
               delay: 500,
               duration: 0,
               useNativeDriver: true,
            }),
         ]),
      )

      if (visible) {
         loop.start()
      } else {
         loop.stop()
         Animated.timing(blinkAnim, {
            toValue: 0,
            useNativeDriver: true,
            duration: 100,
         }).start()
      }

      return () => loop.stop()
   }, [visible])

   const iptStyle = StyleSheet.flatten([s.text, !value && { opacity: 0.5 }])
   const carrotStyle = StyleSheet.flatten([s.carrot, { opacity: blinkAnim }])

   const iptValue = value
      ? AppMoney.createFromCents(value).toDecimal()
      : `0${l10n.decimalSeparator}00`

   return (
      <FocusableBox
         focused={visible}
         onPress={openModal}
         style={style}
      >
         <Text style={s.text}>{l10n.currencySymbol}</Text>

         <View style={s.iptInnerContainer}>
            <Text style={iptStyle}>{iptValue}</Text>
            <Animated.View style={carrotStyle} />
         </View>
      </FocusableBox>
   )
}

const s = StyleSheet.create({
   iptInnerContainer: {
      flex: 1,
      flexDirection: 'row',
      height: sizes.height.md,
      justifyContent: 'flex-end',
      alignItems: 'center',
   },

   text: {
      color: colors.zinc[800],
      fontSize: fonts.size.sm,
      fontFamily: fonts.family.regular,
      textAlign: 'right',
      textAlignVertical: 'center',
   },

   closeArea: {
      flex: 1,
   },

   modalContent: {
      borderTopWidth: 1,
      borderColor: colors.zinc[300],
      backgroundColor: colors.zinc[100],
      paddingHorizontal: 8,
      paddingBottom: 16,
      paddingTop: 8,
   },

   carrot: {
      height: 24,
      width: 2,
      backgroundColor: colors.zinc[800],
   },
})
