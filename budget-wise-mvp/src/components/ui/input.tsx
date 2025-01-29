import { useState } from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

import { colors, fonts, sizes } from '@/styles'
import { FocusableBox } from './focusable-box'

export function Input({ onFocus, onBlur, style, ...props }: TextInputProps) {
   const [focused, setFocused] = useState(false)

   const handleOnFocus = () => setFocused(true)
   const handleOnBlur = () => setFocused(false)

   return (
      <FocusableBox focused={focused}>
         <TextInput
            cursorColor={colors.zinc[800]}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            style={s.ipt}
            {...props}
         />
      </FocusableBox>
   )
}

const s = StyleSheet.create({
   ipt: {
      flex: 1,
      height: sizes.height.md,

      color: colors.zinc[800],
      fontSize: fonts.size.sm,
      fontFamily: fonts.family.regular,
   },
})
