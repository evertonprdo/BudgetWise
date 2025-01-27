import {
   Pressable,
   ViewStyle,
   StyleProp,
   StyleSheet,
   PressableProps,
} from 'react-native'

import Animated, {
   Easing,
   withTiming,
   useSharedValue,
   useAnimatedStyle,
} from 'react-native-reanimated'
import type { DefaultStyle } from 'react-native-reanimated/lib/typescript/hook/commonTypes'

import { colors, fonts } from '../../theme'

type Variants = 'primary' | 'secondary'
type Props = {
   variant?: Variants
   children?: React.ReactNode
   style?: StyleProp<ViewStyle>
} & PressableProps

export function Button({
   variant = 'primary',
   children,
   style,
   ...props
}: Props) {
   const isPressed = useSharedValue(false)

   const handleOnPressIn = () => (isPressed.value = true)
   const handleOnPressOut = () => (isPressed.value = false)

   const btnAnimStyle = useAnimatedStyle(() => {
      const animVariants: Record<Variants, DefaultStyle> = {
         primary: {
            backgroundColor: withTiming(
               isPressed.value ? colors.green[500] : colors.green[700],
               animConfig,
            ),
         },
         secondary: {
            backgroundColor: withTiming(
               isPressed.value ? colors.zinc[300] : 'transparent',
               animConfig,
            ),
            borderColor: withTiming(
               isPressed.value ? colors.zinc[700] : colors.zinc[900],
               animConfig,
            ),
         },
      }
      return animVariants[variant]
   })

   const txtAnimStyle = useAnimatedStyle(() => {
      const animVariants: Record<Variants, DefaultStyle> = {
         primary: {
            color: withTiming(
               isPressed.value ? colors.zinc[50] : colors.zinc[100],
               animConfig,
            ),
         },
         secondary: {
            color: withTiming(
               isPressed.value ? colors.zinc[900] : colors.zinc[800],
               animConfig,
            ),
         },
      }

      return animVariants[variant]
   })

   return (
      <AnimPressable
         style={[s.container, btnAnimStyle, style]}
         onPressIn={handleOnPressIn}
         onPressOut={handleOnPressOut}
         {...props}
      >
         <Animated.Text style={[s.text, txtAnimStyle]}>
            {children}
         </Animated.Text>
      </AnimPressable>
   )
}

const AnimPressable = Animated.createAnimatedComponent(Pressable)
const animConfig = { duration: 300, easing: Easing.out(Easing.ease) }

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
