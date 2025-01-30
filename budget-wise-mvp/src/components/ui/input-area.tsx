import { useRef, useState } from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

import { colors, fonts } from '@/styles'
import { FocusableBox } from './focusable-box'

export function InputArea({
   onFocus,
   onBlur,
   style,
   ...props
}: TextInputProps) {
   const [focused, setFocused] = useState(false)
   const iptRef = useRef<TextInput>(null)

   const handleOnFocus = () => setFocused(true)
   const handleOnBlur = () => setFocused(false)
   const onPressBox = () => {
      iptRef.current?.focus()
   }

   return (
      <FocusableBox
         focused={focused}
         onPress={onPressBox}
      >
         <TextInput
            ref={iptRef}
            placeholder="Description"
            cursorColor={colors.zinc[800]}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            style={s.ipt}
            textAlignVertical="top"
            multiline
            {...props}
         />
      </FocusableBox>
   )
}

const s = StyleSheet.create({
   ipt: {
      flex: 1,
      height: 125,
      color: colors.zinc[800],
      fontSize: fonts.size.sm,
      fontFamily: fonts.family.regular,
   },
})
