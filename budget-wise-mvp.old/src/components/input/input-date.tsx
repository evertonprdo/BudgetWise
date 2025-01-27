import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { DateData } from 'react-native-calendars'

import { Box } from './box'
import { Modal, Calendar, Button } from '../ui'
import { colors, fonts, opacity } from '@/theme'
import { Calendar as CalendarIcon } from '@/assets/icons'

import { AppDate } from '@/utils/app-date'
import { usePortal } from '@/contexts/portal-context'

type Props = {
   date: AppDate | null
   onDateChange: (date: AppDate) => void
}

export function InputDate({ date, onDateChange }: Props) {
   const portal = usePortal()
   const isPressed = useSharedValue(false)

   const [marketDate, setMarketDate] = useState<string | undefined>(
      date?.toYearMonthDayString(),
   )
   const marketDates = marketDate ? { [marketDate]: { selected: true } } : {}

   const handleOnDayPress = (d: DateData) => setMarketDate(d.dateString)
   function dispatchOnDateChange() {
      if (!marketDate) return closeModal()

      const appDate = AppDate.createFromYearMonthDayString(marketDate)
      onDateChange(appDate)
      closeModal()
   }

   function handleOnCancel() {
      setMarketDate(date?.toYearMonthDayString())
      closeModal()
   }

   const handlePressIn = () => (isPressed.value = true)
   const handlePressOut = () => (isPressed.value = false)

   const text = date
      ? date.toFullDate()
      : AppDate.create(new Date()).toFullDate()

   const txtColor = {
      color: marketDate
         ? colors.zinc[800]
         : `${colors.zinc[800]}${opacity[75]}`,
   }

   const closeModal = () => portal.setChildren(undefined)
   function openModal() {
      portal.setChildren(
         <Modal
            title="Calendar"
            onClose={closeModal}
         >
            <Calendar
               markedDates={marketDates}
               onDayPress={handleOnDayPress}
            />
            <View style={s.footer}>
               <Button
                  variant="secondary"
                  onPress={handleOnCancel}
                  style={s.btn}
               >
                  Cancel
               </Button>
               <Button
                  variant="primary"
                  onPress={dispatchOnDateChange}
                  style={s.btn}
               >
                  Confirm
               </Button>
            </View>
         </Modal>,
      )
   }

   return (
      <Box
         isOnFocus={isPressed}
         onPress={openModal}
         onPressIn={handlePressIn}
         onPressOut={handlePressOut}
      >
         <Text style={[s.text, txtColor]}>{text}</Text>
         <View style={s.icon}>
            <CalendarIcon color={colors.zinc[800]} />
         </View>
      </Box>
   )
}

const s = StyleSheet.create({
   text: {
      flex: 1,

      paddingBlock: 12,
      paddingInline: 16,

      fontSize: fonts.size.sm,
      fontFamily: fonts.family.regular,
   },
   icon: {
      aspectRatio: '1/1',
      alignItems: 'center',
      justifyContent: 'center',
   },
   footer: {
      flexDirection: 'row',
      gap: 16,
      marginTop: 24,
   },
   btn: {
      flex: 1,
   },
})
