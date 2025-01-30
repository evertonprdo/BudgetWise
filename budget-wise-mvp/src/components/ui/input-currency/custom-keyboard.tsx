import {
   View,
   Text,
   StyleSheet,
   Animated,
   Pressable,
   useAnimatedValue,
   Easing,
   ViewProps,
} from 'react-native'

import { colors, fonts, opacity, sizes } from '@/styles'
import { ArrowBarToRight, Backspace } from '@/assets/icons'

// prettier-ignore
const inputKeys = [
   1,    2,    3,    null,
   4,    5,    6,    null,
   7,    8,    9,    'backspace',
   null, 0,    null, 'confirm',
]

type Props = {
   onKeyPress: (num: string) => void
} & ViewProps

export function NumericKeyboard({
   onKeyPress: onPress,
   style,
   ...props
}: Props) {
   const handleOnPress = (value: string | number) => onPress(String(value))

   const containerStyle = StyleSheet.compose(s.container, style)

   return (
      <View
         style={containerStyle}
         {...props}
      >
         {inputKeys.map((key, i) => (
            <View
               key={key ?? `Null_${i}`}
               style={s.numBox}
            >
               <AnimNumericKey
                  value={key}
                  onPress={handleOnPress}
               />
            </View>
         ))}
      </View>
   )
}

type NumericKeyProps = {
   value: string | null | number
   onPress: (value: string | number) => void
}

function AnimNumericKey({ value, onPress }: NumericKeyProps) {
   function handleOnPress() {
      if (value === null) return
      onPress(value)
   }

   const isConfirmKey = value === 'confirm'
   const hoverAnim = useAnimatedValue(0)

   const fadeIn = Animated.timing(hoverAnim, {
      ...animConfig,
      toValue: 1,
   })

   const fadeOut = Animated.timing(hoverAnim, {
      ...animConfig,
      toValue: 0,
   })

   const handleOnPressIn = () => fadeIn.start()
   const handleOnPressOut = () => fadeOut.start()

   const backgroundColor = hoverAnim.interpolate({
      inputRange: [0, 1],
      outputRange: isConfirmKey ? hoverConfirmKeyBg : hoverNumericKeyBg,
   })

   const scale = hoverAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.9],
   })

   const numBoxStyle = StyleSheet.flatten([
      s.btn,
      { backgroundColor, transform: [{ scale }] },
      isConfirmKey && { borderRadius: sizes.radius.full, margin: 4 },
   ])

   const Children = () => {
      if (value === null) return null

      if (typeof value === 'number') {
         return <Text style={s.text}>{value}</Text>
      }

      if (value === 'backspace') {
         return (
            <Backspace
               color={colors.zinc[800]}
               size={24}
            />
         )
      }

      return (
         <ArrowBarToRight
            color={colors.zinc[100]}
            size={24}
         />
      )
   }

   return (
      <AnimPressable
         onPress={handleOnPress}
         onPressIn={handleOnPressIn}
         onPressOut={handleOnPressOut}
         style={numBoxStyle}
         disabled={value === null}
      >
         <Children />
      </AnimPressable>
   )
}

const AnimPressable = Animated.createAnimatedComponent(Pressable)

const animConfig = {
   useNativeDriver: true,
   duration: 200,
   easing: Easing.out(Easing.exp),
}

const hoverNumericKeyBg = [`${colors.zinc[300]}${opacity[0]}`, colors.zinc[300]]
const hoverConfirmKeyBg = [colors.green[600], colors.green[500]]

const s = StyleSheet.create({
   container: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      marginTop: 16,
   },

   numBox: {
      width: '25%',
      aspectRatio: 1.5,
      padding: 4,
   },

   btn: {
      flex: 1,

      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: sizes.radius.md,
   },

   text: {
      fontFamily: fonts.family.medium,
      fontSize: fonts.size.md,
      color: colors.zinc[800],
   },
})
