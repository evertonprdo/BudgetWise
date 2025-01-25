import { colors } from '@/theme'
import { Calendar as RNCalendar, CalendarProps } from 'react-native-calendars'
import { ContextProp } from 'react-native-calendars/src/types'

type FRNCalendar = (props: CalendarProps & ContextProp) => React.JSX.Element

export function Calendar({ ...props }: CalendarProps) {
   // Temp autocomplete fix
   const FRNCalendar = RNCalendar as FRNCalendar

   return (
      <FRNCalendar
         theme={{
            arrowColor: colors.green[700],
            textSectionTitleColor: colors.zinc[500],
            calendarBackground: 'transparent',
            selectedDayBackgroundColor: colors.green[500],
            selectedDayTextColor: colors.zinc[50],
            todayTextColor: colors.green[700],
            dayTextColor: colors.zinc[800],
            textDisabledColor: colors.zinc[400],
         }}
         {...props}
      />
   )
}
