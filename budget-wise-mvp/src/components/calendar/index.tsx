import { FlatList } from 'react-native'
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
      ) // YYYY-MM-01T00:00:00.000

      const calendarLength = 42
      const timestampDay = 1000 * 60 * 60 * 24 // 1 day

      const weekDay = currDate.getDay()
      const dayOneTimestamp = currDate.getTime()

      let currDateTimestamp = dayOneTimestamp - timestampDay * weekDay
      let isOutMonthRange = true

      const calendarDays = Array.from({ length: calendarLength }, () => {
         const newDate = new Date(currDateTimestamp)
         if (newDate.getDate() === 1) {
            isOutMonthRange = !isOutMonthRange
         }

         currDateTimestamp += timestampDay
         return { date: newDate, disabled: isOutMonthRange }
      })

      return calendarDays
   }, [currentDate])

   function handleOnDayChange(date: Date) {
      onDayPress && onDayPress(date)
   }

   return (
      <FlatList
         data={calendarWeeks}
         keyExtractor={(item) => String(item.date.getTime())}
         ListHeaderComponent={() => (
            <CalendarHeader
               date={currentDate}
               onMonthChange={setCurrentDate}
            />
         )}
         renderItem={({ item }) => (
            <CalendarDay
               date={item.date}
               disabled={item.disabled}
               markedDay={marketDate}
               onDayPress={handleOnDayChange}
            />
         )}
         numColumns={7}
      />
   )
}
