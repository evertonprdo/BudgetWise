import { useEffect } from 'react'
import {
   Animated,
   Easing,
   Pressable,
   PressableProps,
   StyleProp,
   StyleSheet,
   ViewStyle,
   useAnimatedValue,
} from 'react-native'

import { colors, opacity, sizes } from '@/styles'

type Props = {
   style?: StyleProp<ViewStyle>
   children?: React.ReactNode
   focused?: boolean
} & Omit<PressableProps, 'style' | 'children'>

export function FocusableBox({
   onFocus,
   onBlur,
   style,
   children,
   focused,
   ...props
}: Props) {
   const fadeAnim = useAnimatedValue(0)

   const borderColor = fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [
         `${colors.emerald[500]}${opacity[10]}`,
         colors.emerald[500],
      ],
   })

   const containerStyle = StyleSheet.flatten([
      s.container,
      { borderColor },
      style,
   ])

   useEffect(() => {
      Animated.timing(fadeAnim, {
         toValue: focused ? 1 : 0,
         duration: 300,
         easing: Easing.out(Easing.ease),
         useNativeDriver: true,
      }).start()
   }, [focused])

   return (
      <AnimPressable
         style={containerStyle}
         {...props}
      >
         {children}
      </AnimPressable>
   )
}

const AnimPressable = Animated.createAnimatedComponent(Pressable)

const s = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',

      paddingHorizontal: 16,
      gap: 8,

      backgroundColor: colors.emerald[50],

      borderWidth: 2,
      borderColor: colors.stone[300],
      borderRadius: sizes.radius.md,
   },
})
