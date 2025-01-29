import { useRef, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { colors, fonts, sizes } from '@/styles'
import { Calendar as CalendarIcon } from '@/assets/icons'

import { Button } from '../button'
import { Modal, ModalRefProps } from './modal'
import { Calendar } from '@/components/calendar'

import { AppDate } from '@/utils/app-date'

type Props = {
   appDate?: AppDate | null
   onDateChange?: (date: AppDate) => void
}

export function InputDate({ appDate, onDateChange }: Props) {
   const [marketDate, setMarketDate] = useState<Date | null>()
   const [showCalendar, setShowCalendar] = useState(false)

   const modalRef = useRef<ModalRefProps>(null)

   const openCalendar = () => setShowCalendar(true)
   const closeCalendar = () => setShowCalendar(false)

   function handleOnDayPress(date: Date) {
      setMarketDate(date)
   }

   function handleOnCancel() {
      if (!marketDate || !appDate) return modalRef.current?.requestClose()

      setMarketDate(appDate.date)
      modalRef.current?.requestClose()
   }

   function dispatchOnDateChange() {
      if (!onDateChange) return
      if (!marketDate) return modalRef.current?.requestClose()

      const appDate = AppDate.create(marketDate)
      onDateChange(appDate)
      modalRef.current?.requestClose()
   }

   const textStyle = StyleSheet.compose(s.ipt, { opacity: appDate ? 1 : 0.5 })

   return (
      <>
         <Pressable
            onPress={openCalendar}
            style={s.container}
         >
            <Text style={textStyle}>
               {appDate ? appDate.toFullDate() : AppDate.create().toFullDate()}
            </Text>
            <CalendarIcon />
         </Pressable>

         <Modal
            visible={showCalendar}
            onRequestClose={closeCalendar}
            ref={modalRef}
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
   container: {
      flexDirection: 'row',
      alignItems: 'center',

      paddingHorizontal: 16,
      gap: 8,

      backgroundColor: colors.zinc[100],

      borderWidth: 1,
      borderColor: colors.zinc[300],
      borderRadius: sizes.radius.md,
   },
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
