import { useRef, useState } from 'react'
import { Pressable, StyleSheet, TextInput, TextInputProps } from 'react-native'

import { colors, fonts } from '../../theme'

type Props = { left?: () => JSX.Element } & TextInputProps

export function Input({ left: Left, ...props }: Props) {
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
         {Left && <Left />}
         <TextInput
            ref={iptRef}
            onFocus={handleOnFocus}
            onBlur={handleOnBluer}
            {...props}
         />
      </Pressable>
   )
}

const s = StyleSheet.create({
   container: {
      flexGrow: 1,
      flexDirection: 'row',
      gap: 8,
      justifyContent: 'space-between',
      paddingBlock: 12,
      paddingInline: 16,
      backgroundColor: colors.zinc[100],
      borderWidth: 1,
      borderRadius: 6,
      fontSize: 16,
      color: colors.zinc[800],
      fontFamily: fonts.family.regular,
   },
})
