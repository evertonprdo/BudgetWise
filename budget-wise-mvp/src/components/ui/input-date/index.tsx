import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, fonts, sizes } from '@/styles'
import { Calendar as CalendarIcon } from '@/assets/icons'

import { Button } from '../button'
import { Modal } from './modal'
import { Calendar } from '@/components/calendar'
import { FocusableBox } from '../focusable-box'

import { AppDate } from '@/utils/app-date'

type Props = {
   appDate?: AppDate | null
   onDateChange?: (date: AppDate) => void
}

export function InputDate({ appDate, onDateChange }: Props) {
   const [marketDate, setMarketDate] = useState<Date | null>()
   const [showCalendar, setShowCalendar] = useState(false)

   const openCalendar = () => setShowCalendar(true)
   const closeCalendar = () => setShowCalendar(false)

   function handleOnDayPress(date: Date) {
      setMarketDate(date)
   }

   function handleOnCancel() {
      if (!marketDate || !appDate) return closeCalendar()

      setMarketDate(appDate.date)
      closeCalendar()
   }

   function dispatchOnDateChange() {
      if (!onDateChange) return
      if (!marketDate) return closeCalendar()

      const appDate = AppDate.create(marketDate)
      onDateChange(appDate)
      closeCalendar()
   }

   const textStyle = StyleSheet.compose(s.ipt, { opacity: appDate ? 1 : 0.5 })

   return (
      <>
         <FocusableBox
            focused={showCalendar}
            onPress={openCalendar}
         >
            <Text
               style={textStyle}
               numberOfLines={1}
               ellipsizeMode="tail"
            >
               {appDate ? appDate.toFullDate() : AppDate.create().toFullDate()}
            </Text>
            <CalendarIcon />
         </FocusableBox>

         <Modal
            visible={showCalendar}
            onRequestClose={closeCalendar}
         >
            <Calendar
               marketDate={marketDate}
               onDayPress={handleOnDayPress}
            />

            <View style={s.btnWrapper}>
               <Button
                  onPress={handleOnCancel}
                  variant="secondary"
                  style={s.btn}
               >
                  Cancel
               </Button>
               <Button
                  onPress={dispatchOnDateChange}
                  style={s.btn}
               >
                  Confirm
               </Button>
            </View>
         </Modal>
      </>
   )
}

const s = StyleSheet.create({
   ipt: {
      flex: 1,
      height: sizes.height.md,
      textAlignVertical: 'center',

      color: colors.zinc[800],
      fontSize: fonts.size.sm,
      fontFamily: fonts.family.regular,
   },

   btnWrapper: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 32,
   },

   btn: { flex: 1 },
})
