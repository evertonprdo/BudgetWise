import { useRef, useState } from 'react'
import { StyleSheet, Text, TextInput, TextInputProps } from 'react-native'

import { colors, fonts, sizes } from '@/styles'
import { FocusableBox } from '../focusable-box'

import { l10n } from '@/libs/localization'
import { AppMoney } from '@/utils/app-money'
import { NumericKeyboard } from './custom-keyboard'

type Props = {
   value?: AppMoney | null
   onChangeText?: (value: AppMoney | null) => void
} & Omit<TextInputProps, 'value' | 'placeholder' | 'inputMode' | 'onChangeText'>

export function InputCurrency({ value, onChangeText, ...props }: Props) {
   const [focused, setFocused] = useState(false)
   const iptRef = useRef<TextInput>(null)

   const handleOnFocus = () => setFocused(true)
   const handleOnBlur = () => setFocused(false)
   const handleOnPressBox = () => iptRef.current?.focus()

   function handleOnChangeText(text: string) {
      if (!onChangeText) return

      const numbers = text.replace(/\D/g, '')
      onChangeText(AppMoney.createFromCents(Number(numbers)))
   }

   const iptStyle = StyleSheet.compose(s.ipt, s.text)

   return (
      <>
         <FocusableBox
            focused={focused}
            onPress={handleOnPressBox}
         >
            <Text style={s.text}>{l10n.currencySymbol}</Text>
            <TextInput
               value={value?.toDecimal()}
               onChangeText={handleOnChangeText}
               onBlur={handleOnBlur}
               onFocus={handleOnFocus}
               ref={iptRef}
               placeholder={`0${l10n.decimalSeparator}00`}
               cursorColor={colors.zinc[800]}
               style={iptStyle}
               inputMode="numeric"
               {...props}
            />
         </FocusableBox>

         <NumericKeyboard onKeyPress={() => {}} />
      </>
   )
}

const s = StyleSheet.create({
   ipt: {
      flex: 1,
      height: sizes.height.md,
   },
   text: {
      color: colors.zinc[800],
      fontSize: fonts.size.sm,
      fontFamily: fonts.family.regular,
      textAlign: 'right',
   },
})
