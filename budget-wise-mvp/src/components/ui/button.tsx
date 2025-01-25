import { useState } from 'react'
import {
   Pressable,
   PressableProps,
   StyleProp,
   StyleSheet,
   Text,
   TextStyle,
   ViewStyle,
} from 'react-native'

import { colors, fonts } from '../../theme'

type Variants = 'primary' | 'secondary'
type Props = {
   variant?: Variants
   children?: React.ReactNode
   style?: StyleProp<ViewStyle>
} & PressableProps

const btnAnimStyle: Record<Variants, StyleProp<ViewStyle>[]> = {
   primary: [
      { backgroundColor: colors.green[700] },
      { backgroundColor: colors.green[500] },
   ],
   secondary: [
      { backgroundColor: 'transparent', borderColor: colors.zinc[700] },
      { backgroundColor: colors.zinc[300], borderColor: colors.zinc[900] },
   ],
}
const txtAnimStyle: Record<Variants, StyleProp<TextStyle>[]> = {
   primary: [{ color: colors.zinc[100] }, { color: colors.zinc[50] }],
   secondary: [{ color: colors.zinc[800] }, { color: colors.zinc[900] }],
}

export function Button({
   children,
   variant = 'primary',
   style,
   ...props
}: Props) {
   const [isPressed, setIsPressed] = useState(false)

   const txtStyle = isPressed
      ? txtAnimStyle[variant][1]
      : txtAnimStyle[variant][0]

   const btnStyle = isPressed
      ? btnAnimStyle[variant][1]
      : btnAnimStyle[variant][0]

   function handleOnPressIn() {
      setIsPressed(true)
   }
   function handleOnPressOut() {
      setIsPressed(false)
   }

   return (
      <Pressable
         style={[s.container, btnStyle, style]}
         onPressIn={handleOnPressIn}
         onPressOut={handleOnPressOut}
         {...props}
      >
         <Text style={[s.text, txtStyle]}>{children}</Text>
      </Pressable>
   )
}

const s = StyleSheet.create({
   container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingInline: 12,
      paddingBlock: 12,
      gap: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'transparent',
   },

   text: {
      flex: 1,
      fontSize: fonts.size.sm,
      fontFamily: fonts.family.semiBold,
      color: colors.zinc[100],
      textAlign: 'center',
   },
})
