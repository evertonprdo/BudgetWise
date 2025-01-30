import { useEffect } from 'react'
import {
   Animated,
   Easing,
   Pressable,
   StyleSheet,
   useAnimatedValue,
} from 'react-native'

import { colors, sizes } from '@/styles'
import { ArrowCircle } from '@/assets/icons'

type Props = {
   isIn?: boolean
   onValueChange?: (val: boolean) => void
}

export function InOutButton({ isIn, onValueChange }: Props) {
   const handleOnPress = () => {
      onValueChange && onValueChange(!isIn)
   }
   const fadeAnim = useAnimatedValue(0)

   const backgroundColor = fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.red[500], colors.green[500]],
   })

   const rotate = fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
   })

   useEffect(() => {
      Animated.timing(fadeAnim, {
         toValue: isIn ? 1 : 0,
         useNativeDriver: true,
         duration: 200,
         easing: Easing.out(Easing.circle),
      }).start()
   }, [isIn])

   const containerStyle = StyleSheet.flatten([
      s.container,
      { backgroundColor, transform: [{ rotate }] },
   ])

   return (
      <AnimPressable
         style={containerStyle}
         onPress={handleOnPress}
      >
         <ArrowCircle
            color={colors.zinc[100]}
            size={32}
         />
      </AnimPressable>
   )
}

const AnimPressable = Animated.createAnimatedComponent(Pressable)

const s = StyleSheet.create({
   container: {
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: sizes.radius.md,
   },
})
