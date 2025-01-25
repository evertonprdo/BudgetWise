import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { DateData } from 'react-native-calendars'

import { Modal, Calendar, Button } from './ui'
import { colors, fonts, opacity } from '@/theme'
import { Calendar as CalendarIcon } from '@/assets/icons'

import { AppDate } from '@/utils/app-date'

type Props = {
   date: AppDate | null
   onDateChange: (date: AppDate) => void
}

export function InputDate({ date, onDateChange }: Props) {
   const [isPressed, setIsPressed] = useState(false)
   const [isModalVisible, setIsModalVisible] = useState(false)

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
      if (!marketDate || !date) return closeModal()

      setMarketDate(date.toYearMonthDayString())
      closeModal()
   }

   const openModal = () => setIsModalVisible(true)
   const closeModal = () => setIsModalVisible(false)

   const handlePressIn = () => setIsPressed(true)
   const handlePressOut = () => setIsPressed(false)

   const text = date
      ? date.toFullDate()
      : AppDate.create(new Date()).toFullDate()

   const txtColor = {
      color: marketDate
         ? colors.zinc[800]
         : `${colors.zinc[800]}${opacity[75]}`,
   }

   const borderColor = {
      borderColor: isPressed ? colors.zinc[500] : 'transparent',
   }

   return (
      <Pressable
         onPress={openModal}
         onPressIn={handlePressIn}
         onPressOut={handlePressOut}
         style={[s.container, borderColor]}
      >
         <Text style={[s.text, txtColor]}>{text}</Text>
         <View style={s.icon}>
            <CalendarIcon color={colors.zinc[800]} />
         </View>

         <Modal
            title="Calendar"
            visible={isModalVisible}
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
         </Modal>
      </Pressable>
   )
}

const s = StyleSheet.create({
   container: {
      flexDirection: 'row',
      gap: 8,
      borderWidth: 1,
      borderRadius: 6,
      backgroundColor: colors.zinc[100],
   },
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
