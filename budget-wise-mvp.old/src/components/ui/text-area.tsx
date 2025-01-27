import { useRef, useState } from 'react'
import { Pressable, StyleSheet, TextInput } from 'react-native'

import { colors, fonts } from '../../theme'

export function TextArea() {
   const [isFocused, setIsFocused] = useState(false)
   const iptRef = useRef<TextInput>(null)

   const borderColor = isFocused ? colors.zinc[500] : 'transparent'

   function handleOnFocus() {
      setIsFocused(true)
   }
   function handleOnBluer() {
      setIsFocused(false)
   }
   function handleOnPress() {
      iptRef.current?.focus()
   }

   return (
      <Pressable
         style={[s.container, { borderColor }]}
         onPress={handleOnPress}
         hitSlop={8}
      >
         <TextInput
            ref={iptRef}
            placeholder="Description"
            onFocus={handleOnFocus}
            onBlur={handleOnBluer}
            style={s.input}
            multiline
         />
      </Pressable>
   )
}

const s = StyleSheet.create({
   container: {
      flexGrow: 1,
      minHeight: 160,
      paddingBlock: 12,
      paddingInline: 16,
      backgroundColor: colors.zinc[100],
      borderWidth: 1,
      borderRadius: 6,
      fontSize: 16,
      color: colors.zinc[800],
      fontFamily: fonts.family.regular,
   },
   input: {
      flex: 1,
      verticalAlign: 'top',
   },
})
