import { Pressable, StyleSheet, Text, View } from 'react-native'

import { colors, fonts } from '@/styles'
import { Triangle } from '@/assets/icons'

type Props = {
   date: Date
   onMonthChange: (date: Date) => void
}

export function CalendarHeader({ date, onMonthChange }: Props) {
   function monthOffset(date: Date, offset: number) {
      return new Date(date.getFullYear(), date.getMonth() + offset, 1)
   }

   const handleOnPressPrevMonth = () => onMonthChange(monthOffset(date, -1))
   const handleOnPressNextMonth = () => onMonthChange(monthOffset(date, +1))

   const iconSize = 12
   const iconColor = colors.zinc[500]

   const nextIconStyle = StyleSheet.compose(s.icon, s.nextIcon)

   return (
      <View style={s.container}>
         <Text style={s.title}>
            {Intl.DateTimeFormat('default', {
               month: 'long',
               year: 'numeric',
            }).format(date)}
         </Text>

         <View style={s.options}>
            <Pressable
               onPress={handleOnPressPrevMonth}
               style={s.icon}
            >
               <Triangle
                  size={iconSize}
                  color={iconColor}
               />
            </Pressable>
            <Pressable
               onPress={handleOnPressNextMonth}
               style={nextIconStyle}
            >
               <Triangle
                  size={iconSize}
                  color={iconColor}
               />
            </Pressable>
         </View>
      </View>
   )
}

const s = StyleSheet.create({
   container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
   },

   title: {
      fontFamily: fonts.family.medium,
   },

   options: {
      flexDirection: 'row',
      gap: 32,
   },

   icon: {
      height: 32,
      width: 32,
      justifyContent: 'center',
      alignItems: 'center',
   },

   nextIcon: {
      transform: [{ rotate: '180deg' }],
   },
})
