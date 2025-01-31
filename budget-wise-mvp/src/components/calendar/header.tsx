import { useMemo } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { colors, fonts } from '@/styles'
import { Triangle } from '@/assets/icons'

import { l10n } from '@/libs/localization'

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
   const iconColor = colors.stone[500]

   const nextIconStyle = StyleSheet.compose(s.icon, s.nextIcon)

   const weekDays = useMemo(() => {
      return Array.from({ length: 7 }, (_, i) =>
         Intl.DateTimeFormat(l10n.regionCode ?? 'default', {
            weekday: 'long',
            timeZone: 'UTC',
         }).format(new Date(Date.UTC(2023, 0, i + 1))),
      ) // Intl.getWeekDays()
   }, [])

   return (
      <>
         <View style={s.header}>
            <Text style={s.title}>
               {Intl.DateTimeFormat(l10n.regionCode ?? 'default', {
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

         <View style={s.weekDays}>
            {weekDays.map((item) => (
               <Text
                  key={item}
                  style={s.weekDayText}
               >
                  {item.substring(0, 2)}
               </Text>
            ))}
         </View>
      </>
   )
}

const s = StyleSheet.create({
   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 8,
      paddingBottom: 16,
   },
   weekDays: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   weekDayText: {
      flex: 1,
      aspectRatio: '1/1',
      margin: 4,
      fontFamily: fonts.family.medium,
      fontSize: fonts.size.sm,
      textAlign: 'center',
      verticalAlign: 'middle',
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
