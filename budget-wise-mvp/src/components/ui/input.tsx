import {
   Animated,
   Easing,
   StyleSheet,
   TextInput,
   TextInputProps,
   useAnimatedValue,
} from 'react-native'
import { colors, fonts, opacity, sizes } from '@/styles'

export function Input({ onFocus, onBlur, style, ...props }: TextInputProps) {
   const fadeAnim = useAnimatedValue(0)

   function easeOut(toValue: number) {
      Animated.timing(fadeAnim, {
         toValue,
         duration: 300,
         easing: Easing.out(Easing.ease),
         useNativeDriver: true,
      }).start()
   }

   const handleOnFocus = () => easeOut(1)
   const handleOnBlur = () => easeOut(0)

   const borderColor = fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [`${colors.zinc[500]}${opacity[0]}`, colors.zinc[500]],
   })

   return (
      <Animated.View style={[s.container, { borderColor }]}>
         <TextInput
            cursorColor={colors.zinc[800]}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            style={[s.ipt, style]}
            {...props}
         />
      </Animated.View>
   )
}

const s = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',

      paddingHorizontal: 16,
      gap: 8,

      backgroundColor: colors.zinc[100],

      borderWidth: 1,
      borderColor: colors.zinc[300],
      borderRadius: sizes.radius.md,
   },
   ipt: {
      flex: 1,
      height: sizes.height.md,

      color: colors.zinc[800],
      fontSize: fonts.size.sm,
      fontFamily: fonts.family.regular,
   },
})
