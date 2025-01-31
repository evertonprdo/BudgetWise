import { useEffect } from 'react'
import {
   Animated,
   Easing,
   Pressable,
   StyleSheet,
   Text,
   useAnimatedValue,
} from 'react-native'

import { colors, fonts, opacity, sizes } from '@/styles'
import { ArrowCircleRight, ArrowSort } from '@/assets/icons'

type Props = {
   variant: 'income' | 'expense'
   onValueChange: (val: 'income' | 'expense') => void
}

export function SwitchTransactionType({ variant, onValueChange }: Props) {
   const handleOnPress = () => {
      const value = variant === 'expense' ? 'income' : 'expense'
      onValueChange(value)
   }

   const fadeAnim = useAnimatedValue(0)

   useEffect(() => {
      Animated.timing(fadeAnim, {
         toValue: variant === 'income' ? 1 : 0,
         useNativeDriver: true,
         duration: 200,
         easing: Easing.out(Easing.circle),
      }).start()
   }, [variant])

   const backgroundColor = fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.rose[500], colors.emerald[500]],
   })

   const rotateX = fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
   })

   const iconStyle = StyleSheet.flatten([
      s.iconContainer,
      { backgroundColor, transform: [{ rotateX }] },
   ])

   const borderColor = fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: labelBorderColor[variant],
   })

   const labelStyle = StyleSheet.flatten([
      s.label,
      { backgroundColor: labelBgColor[variant], borderColor },
   ])

   return (
      <Pressable
         onPress={handleOnPress}
         style={s.container}
      >
         <Animated.View style={iconStyle}>
            <ArrowCircleRight
               color={colors.stone[100]}
               size={32}
            />
         </Animated.View>

         <Animated.View style={labelStyle}>
            <Text style={s.text}>{variant}</Text>
            <ArrowSort
               size={20}
               color={colors.stone[800]}
            />
         </Animated.View>
      </Pressable>
   )
}

const labelBgColor = {
   income: colors.emerald[50],
   expense: colors.rose[50],
}

const labelBorderColor = {
   income: [`${colors.emerald[500]}${opacity[30]}`, colors.emerald[500]],
   expense: [`${colors.rose[500]}${opacity[30]}`, colors.rose[500]],
}

const s = StyleSheet.create({
   container: {
      height: sizes.height.md,
      flexDirection: 'row',
      gap: 8,
   },
   label: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 16,
      borderWidth: 2,
      borderColor: colors.emerald[500],
      backgroundColor: colors.emerald[50],
      borderRadius: sizes.radius.md,
   },
   text: {
      flex: 1,
      fontFamily: fonts.family.medium,
      fontSize: fonts.size.md,
      color: colors.stone[800],
      textTransform: 'capitalize',
   },
   iconContainer: {
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: sizes.radius.md,
   },
})
