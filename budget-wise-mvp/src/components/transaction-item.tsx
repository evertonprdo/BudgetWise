import {
   Text,
   View,
   Easing,
   Animated,
   Pressable,
   StyleSheet,
   useAnimatedValue,
} from 'react-native'

import { IconView } from './ui'
import { IconComponent } from '@/assets/icons'
import { colors, fonts, opacity, sizes } from '@/styles'

export interface TransactionProps {
   type: 'income' | 'expense'
   date: string
   amount: string
   description: string
   category: {
      icon: IconComponent
      color: string
   }
}

type Props = {
   transaction: TransactionProps
   onPress?: () => void
}

export function TransactionItem({
   transaction: { type, amount, category, date, description },
   onPress,
}: Props) {
   const handleOnPressIn = () => onPress && pushIn.start()
   const handleOnPressOut = () => onPress && pushOut.start()

   const animValue = useAnimatedValue(0)

   const pushIn = Animated.timing(animValue, {
      ...animConfig,
      toValue: 1,
   })

   const pushOut = Animated.timing(animValue, {
      ...animConfig,
      toValue: 0,
   })

   const scale = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.9],
   })

   const containerStyle = StyleSheet.flatten([
      s.container,
      { transform: [{ scale }] },
   ])

   const pipeStyle = StyleSheet.compose(s.pipe, {
      backgroundColor: pipeBgColor[type],
   })

   return (
      <AnimPressable
         onPress={onPress}
         onPressIn={handleOnPressIn}
         onPressOut={handleOnPressOut}
         style={containerStyle}
      >
         <View style={pipeStyle} />

         <View style={s.content}>
            <View style={s.header}>
               <Text
                  style={s.title}
                  numberOfLines={2}
                  ellipsizeMode="tail"
               >
                  {description}
               </Text>
               <IconView
                  icon={category.icon}
                  color={category.color}
                  style={s.icon}
                  size={16}
               />
            </View>

            <View style={s.description}>
               <Text
                  style={s.amount}
                  numberOfLines={1}
                  ellipsizeMode="tail"
               >
                  {amount}
               </Text>
               <Text
                  style={s.txtDate}
                  numberOfLines={2}
                  ellipsizeMode="tail"
               >
                  {date}
               </Text>
            </View>
         </View>
      </AnimPressable>
   )
}

const AnimPressable = Animated.createAnimatedComponent(Pressable)
const animConfig = {
   useNativeDriver: true,
   duration: 175,
   easing: Easing.out(Easing.circle),
}

const pipeBgColor = {
   income: colors.emerald[500],
   expense: colors.rose[500],
}

const s = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',

      padding: 8,

      borderWidth: 2,
      borderRadius: sizes.radius.md,
      borderColor: `${colors.stone[300]}${opacity[10]}`,

      backgroundColor: colors.stone[50],
      zIndex: 10,
   },

   pipe: {
      height: '100%',
      width: 6,
      backgroundColor: 'red',
      borderRadius: sizes.radius.md,
   },

   content: {
      flex: 1,
      gap: 8,
      paddingLeft: 16,
   },

   header: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 16,
   },

   title: {
      flex: 1,
      fontFamily: fonts.family.medium,
   },

   description: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: 16,
      marginBottom: -4,
   },

   amount: {
      fontFamily: fonts.family.semiBold,
      fontSize: fonts.size.lg,
   },

   txtDate: {
      fontFamily: fonts.family.semiBold,
      fontSize: fonts.size.sm,
   },

   icon: {
      padding: 6,
   },
})
