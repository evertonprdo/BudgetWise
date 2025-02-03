import { StyleSheet, View } from 'react-native'
import { useMemo, useState } from 'react'

import { CalendarDay } from './day'
import { CalendarHeader } from './header'

type Props = {
   marketDate?: Date | null
   onDayPress?: (date: Date) => void
}

export function Calendar({ marketDate, onDayPress }: Props) {
   const [currentDate, setCurrentDate] = useState(new Date())

   const calendarWeeks = useMemo(() => {
      const currDate = new Date(
         currentDate.getFullYear(),
         currentDate.getMonth(),
         1,
      ) // YYYY-MM-01THH:MM:SS.000

      const calendarLength = 42
      const timestampDay = 1000 * 60 * 60 * 24 // 1 day

      const weekDay = currDate.getDay()
      const dayOneTimestamp = currDate.getTime()

      let currDateTimestamp = dayOneTimestamp - timestampDay * weekDay
      let isOutMonthRange = true
      let isDateDisabledAfterToday = true

      const calendarDays = Array.from({ length: calendarLength }, () => {
         const newDate = new Date(currDateTimestamp)
         if (newDate.getDate() === 1) {
            isOutMonthRange = !isOutMonthRange
         }

         let disabled = isOutMonthRange

         if (isDateDisabledAfterToday && !isOutMonthRange) {
            disabled = newDate.getTime() > new Date().getTime()
         }

         currDateTimestamp += timestampDay
         return { date: newDate, disabled }
      })

      return calendarDays
   }, [currentDate])

   function handleOnDayChange(date: Date) {
      onDayPress && onDayPress(date)
   }

   return (
      <View>
         <CalendarHeader
            date={currentDate}
            onMonthChange={setCurrentDate}
         />

         <View style={s.content}>
            {calendarWeeks.map((item) => (
               <View
                  key={item.date.getTime()}
                  style={s.boxDay}
               >
                  <CalendarDay
                     date={item.date}
                     disabled={item.disabled}
                     markedDay={marketDate}
                     onDayPress={handleOnDayChange}
                  />
               </View>
            ))}
         </View>
      </View>
   )
}

const s = StyleSheet.create({
   content: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
   },
   boxDay: {
      width: '14%',
      aspectRatio: 1,
   },
})
