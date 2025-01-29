import { FlatList, Text, View } from 'react-native'
import { AppDate } from '@/utils/app-date'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui'

export function ScreenCalendar() {
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

   function monthOffset(date: Date, offset: number) {
      return new Date(date.getFullYear(), date.getMonth() + offset, 1)
   }

   return (
      <FlatList
         data={calendarWeeks}
         keyExtractor={(item) => String(item.date.getTime())}
         ListHeaderComponent={() => (
            <>
               <Text>
                  {Intl.DateTimeFormat('default', {
                     month: 'long',
                     year: 'numeric',
                  }).format(currentDate)}
               </Text>
               <Button
                  onPress={() =>
                     setCurrentDate((state) => new Date(monthOffset(state, -1)))
                  }
               >
                  Prev
               </Button>
               <Button
                  onPress={() =>
                     setCurrentDate((state) => new Date(monthOffset(state, 1)))
                  }
               >
                  Next
               </Button>
            </>
         )}
         renderItem={calendarDay}
         numColumns={7}
      />
   )
}

function calendarDay({ item }: { item: { date: Date; disabled: boolean } }) {
   return (
      <Text
         style={{
            flex: 1,
            aspectRatio: '1/1',
            textAlign: 'center',
            verticalAlign: 'middle',
            backgroundColor: 'gray',
            margin: 1,
            borderRadius: 6,
            opacity: item.disabled ? 0.5 : 1,
         }}
         key={item.date.getTime()}
      >
         {item.date.getDate()}
      </Text>
   )
}
