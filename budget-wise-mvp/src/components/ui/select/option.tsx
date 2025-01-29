import {
   Animated,
   Easing,
   Pressable,
   PressableProps,
   StyleSheet,
   Text,
   useAnimatedValue,
   View,
} from 'react-native'

import { IconComponent } from '@/assets/icons'
import { colors, fonts, opacity, sizes } from '@/styles'

type Props = {
   name: string
   selected?: string | null
   color?: string
   icon?: IconComponent
   onPressOption?: (name: string) => void
   children?: string
} & Omit<PressableProps, 'children'>

export function Option({
   name,
   color,
   disabled,
   selected,
   children,
   icon: Icon,
   onPressOption,
   ...props
}: Props) {
   const hoverAnim = useAnimatedValue(0)

   const hoverIn = Animated.timing(hoverAnim, { ...animConfig, toValue: 1 })
   const hoverOut = Animated.timing(hoverAnim, { ...animConfig, toValue: 0 })

   const handlePressIn = () => hoverIn.start()
   const handlePressOut = () => hoverOut.start()

   const handleOnPress = () => onPressOption && onPressOption(name)

   const backgroundColor = hoverAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [`${colors.zinc[300]}${opacity[0]}`, colors.zinc[300]],
   })

   const containerStyle = StyleSheet.flatten([
      s.container,
      { backgroundColor },
      disabled && { paddingHorizontal: 0, margin: 0 },
   ])

   const iconContainerStyle = StyleSheet.compose(s.iconContainer, {
      backgroundColor: color,
   })

   const textStyle = StyleSheet.compose(
      s.text,
      selected === name && { fontFamily: fonts.family.semiBold },
   )

   return (
      <AnimPressable
         onPress={handleOnPress}
         onPressIn={handlePressIn}
         onPressOut={handlePressOut}
         style={containerStyle}
         disabled={disabled}
         {...props}
      >
         {Icon && (
            <View style={iconContainerStyle}>
               <Icon
                  size={14}
                  color={colors.zinc[100]}
               />
            </View>
         )}

         <Text
            style={textStyle}
            numberOfLines={1}
            ellipsizeMode="tail"
         >
            {children}
         </Text>
      </AnimPressable>
   )
}

const AnimPressable = Animated.createAnimatedComponent(Pressable)
const animConfig = {
   useNativeDriver: true,
   easing: Easing.out(Easing.circle),
   duration: 200,
}

const s = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',

      paddingHorizontal: 8,

      gap: 16,
      borderRadius: sizes.radius.md,
   },
   text: {
      height: sizes.height.md,

      textAlignVertical: 'center',
      color: colors.zinc[800],
      fontSize: fonts.size.sm,
      fontFamily: fonts.family.regular,
   },

   iconContainer: {
      padding: 6,
      borderRadius: sizes.radius.full,
   },
})
