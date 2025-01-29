import { StyleSheet, Text } from 'react-native'
import { colors, fonts, sizes } from '@/styles'

type Props = {
   date: Date
   disabled: boolean
   markedDay?: Date | null
   onDayPress?: (date: Date) => void
}

export function CalendarDay({ date, disabled, markedDay, onDayPress }: Props) {
   function handleDayPress() {
      onDayPress && onDayPress(date)
   }

   const today = new Date()
   today.setHours(0, 0, 0, 0)

   const isToday = today.getTime() === date.getTime()
   const isMarkedDay = markedDay?.getTime() === date.getTime()

   const dayStyle = StyleSheet.flatten([
      s.day,
      { opacity: disabled ? 0.3 : 1 },
      isToday && s.today,
      isMarkedDay && s.markedDay,
   ])

   return (
      <Text
         style={dayStyle}
         key={date.getTime()}
         onPress={handleDayPress}
         disabled={disabled}
      >
         {date.getDate()}
      </Text>
   )
}

const s = StyleSheet.create({
   day: {
      flex: 1,
      aspectRatio: '1/1',
      margin: 4,

      color: colors.zinc[800],
      fontFamily: fonts.family.regular,
      fontSize: fonts.size.sm,
      textAlign: 'center',
      verticalAlign: 'middle',

      borderRadius: sizes.radius.full,
   },
   markedDay: {
      fontFamily: fonts.family.medium,
      backgroundColor: colors.green[500],
      color: colors.zinc[100],
   },
   today: {
      color: colors.green[700],
   },
})
