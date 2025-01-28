import {
   Text,
   Easing,
   Animated,
   ViewStyle,
   StyleProp,
   Pressable,
   StyleSheet,
   PressableProps,
   useAnimatedValue,
   GestureResponderEvent,
} from 'react-native'

import { colors, fonts, sizes, opacity } from '@/styles'

type Variants = 'primary' | 'secondary'

type Props = {
   variant?: Variants
   style?: StyleProp<ViewStyle>
} & PressableProps

export function Button({
   variant = 'primary',
   style,
   children,
   onPressIn,
   onPressOut,
   ...props
}: Props) {
   const fadeAnim = useAnimatedValue(0)

   function easeOut(toValue: number) {
      Animated.timing(fadeAnim, {
         toValue,
         duration: 200,
         useNativeDriver: true,
         easing: Easing.out(Easing.cubic),
      }).start()
   }

   function handlePressIn(event: GestureResponderEvent) {
      easeOut(1)
      onPressIn && onPressIn(event)
   }
   function handlePressOut(event: GestureResponderEvent) {
      easeOut(0)
      onPressOut && onPressOut(event)
   }

   const backgroundColor = fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: hoverBgColor[variant],
   })

   const scale = fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.9],
   })

   const containerStyle = StyleSheet.flatten([
      s.container,
      { backgroundColor, transform: [{ scale }] },
      variant === 'secondary' && { borderColor: colors.zinc[600] },
      style,
   ])

   const textStyle = StyleSheet.compose(s.txt, { color: txtColor[variant] })

   return (
      <AnimPressable
         style={containerStyle}
         onPressIn={handlePressIn}
         onPressOut={handlePressOut}
         {...props}
      >
         {typeof children === 'string' ? (
            <Text style={textStyle}>{children}</Text>
         ) : (
            children
         )}
      </AnimPressable>
   )
}

const AnimPressable = Animated.createAnimatedComponent(Pressable)

const hoverBgColor: Record<Variants, string[]> = {
   primary: [colors.green[600], colors.green[500]],
   secondary: [`${colors.zinc[300]}${opacity[0]}`, colors.zinc[300]],
}

const txtColor: Record<Variants, string> = {
   primary: colors.zinc[100],
   secondary: colors.zinc[800],
}

const s = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: sizes.height.md,
      borderRadius: sizes.radius.md,
      paddingHorizontal: 24,
      borderWidth: 1,
      borderColor: 'transparent',
   },
   txt: {
      flex: 1,
      fontFamily: fonts.family.medium,
      fontSize: fonts.size.sm,
      textAlign: 'center',
   },
})
