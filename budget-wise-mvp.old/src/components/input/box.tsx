import { colors } from '@/theme'
import { Pressable, PressableProps, StyleSheet } from 'react-native'
import Animated, {
   SharedValue,
   useAnimatedStyle,
   withTiming,
} from 'react-native-reanimated'

type Props = {
   isOnFocus?: SharedValue<boolean>
} & PressableProps

export function Box({ isOnFocus, children, style, ...props }: Props) {
   const animStyle = useAnimatedStyle(() => ({
      borderColor:
         isOnFocus &&
         withTiming(isOnFocus.value ? colors.zinc[500] : 'transparent'),
   }))

   return (
      <AnimPressable
         style={[s.container, animStyle, style]}
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
      gap: 8,
      borderWidth: 1,
      borderRadius: 6,
      borderColor: 'transparent',
      backgroundColor: colors.zinc[100],
   },
})
